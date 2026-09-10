type MediaGlobal = typeof globalThis & {
  __chatkaLocalStream?: MediaStream | null;
  __chatkaMediaRequest?: Promise<MediaStream> | null;
  __chatkaMediaBound?: boolean;
};

function mediaGlobal() {
  return globalThis as MediaGlobal;
}

function getHeldStream() {
  return mediaGlobal().__chatkaLocalStream ?? null;
}

function setHeldStream(stream: MediaStream | null) {
  mediaGlobal().__chatkaLocalStream = stream;
}

export function isStreamLive(stream: MediaStream | null) {
  return Boolean(
    stream?.getTracks().some((track) => track.readyState === "live"),
  );
}

function pageStreams() {
  const streams = new Set<MediaStream>();
  const held = getHeldStream();
  if (held) {
    streams.add(held);
  }

  if (typeof document === "undefined") {
    return [...streams];
  }

  document.querySelectorAll("video, audio").forEach((element) => {
    const src = (element as HTMLMediaElement).srcObject;
    if (src instanceof MediaStream) {
      streams.add(src);
    }
  });

  return [...streams];
}

export function getLiveUserMedia() {
  return pageStreams().find((stream) => isStreamLive(stream)) ?? null;
}

function detachStream(stream: MediaStream | null) {
  if (!stream || typeof document === "undefined") {
    return;
  }

  document.querySelectorAll("video, audio").forEach((element) => {
    const media = element as HTMLMediaElement;
    if (media.srcObject === stream) {
      media.srcObject = null;
    }
  });
}

export function stopMediaStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => {
    track.stop();
  });
}

export function holdUserMedia(stream: MediaStream) {
  setHeldStream(stream);
}

function releaseAllPageMedia() {
  pageStreams().forEach((stream) => {
    detachStream(stream);
    stopMediaStream(stream);
  });
  setHeldStream(null);
}

export function releaseUserMedia() {
  releaseAllPageMedia();
}

export function canUseUserMedia() {
  return Boolean(
    typeof navigator !== "undefined" &&
      window.isSecureContext &&
      navigator.mediaDevices?.getUserMedia,
  );
}

function secureContextError() {
  const error = new Error("Secure context required");
  error.name = "SecurityError";
  return error;
}

function mergeStreams(streams: MediaStream[]) {
  const tracks = streams.flatMap((stream) => stream.getTracks());
  return new MediaStream(tracks);
}

function getStream(constraints: MediaStreamConstraints) {
  if (!canUseUserMedia()) {
    throw secureContextError();
  }

  return navigator.mediaDevices.getUserMedia(constraints);
}

async function getOptionalStream(constraints: MediaStreamConstraints) {
  try {
    return await getStream(constraints);
  } catch {
    return null;
  }
}

async function acquireUserMedia() {
  try {
    return await getStream({ video: true, audio: true });
  } catch (error) {
    if (!(error instanceof Error) || error.name !== "NotReadableError") {
      throw error;
    }
  }

  const video = await getOptionalStream({ video: true, audio: false });
  const audio = await getOptionalStream({ video: false, audio: true });

  if (!video && !audio) {
    const error = new Error("Media devices are busy");
    error.name = "NotReadableError";
    throw error;
  }

  return mergeStreams([video, audio].filter(Boolean) as MediaStream[]);
}

function openUserMedia(force = false) {
  const live = getLiveUserMedia();
  if (!force && live) {
    setHeldStream(live);
    return Promise.resolve(live);
  }

  releaseAllPageMedia();
  return acquireUserMedia().then((stream) => {
    setHeldStream(stream);
    return stream;
  });
}

export function requestUserMedia(options?: { force?: boolean }) {
  const store = mediaGlobal();
  if (store.__chatkaMediaRequest) {
    return store.__chatkaMediaRequest.then((stream) => {
      if (!options?.force && isStreamLive(stream)) {
        return stream;
      }

      return openUserMedia(true);
    });
  }

  const request = openUserMedia(options?.force);
  store.__chatkaMediaRequest = request;

  return request.finally(() => {
    if (store.__chatkaMediaRequest === request) {
      store.__chatkaMediaRequest = null;
    }
  });
}

function bindMediaLifecycle() {
  if (typeof window === "undefined" || mediaGlobal().__chatkaMediaBound) {
    return;
  }

  mediaGlobal().__chatkaMediaBound = true;
  releaseAllPageMedia();

  window.addEventListener("pagehide", () => {
    releaseAllPageMedia();
  });
}

bindMediaLifecycle();
