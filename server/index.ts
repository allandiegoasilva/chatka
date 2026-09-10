import { loadEnvConfig } from "@next/env";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createServer as createHttpsServer } from "node:https";
import { parse } from "node:url";
import next from "next";
import { Server } from "socket.io";
import { loadDevCertificates, localAddresses } from "./dev-certs";
import { attachSocket } from "./socket";

loadEnvConfig(process.cwd());

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const httpPort = dev ? Number(process.env.HTTP_PORT || 3080) : port;
const httpsPort = Number(process.env.HTTPS_PORT || port);

const app = next({
  dev,
  hostname: process.env.NEXT_HOSTNAME || "localhost",
  port,
});

const handle = app.getRequestHandler();

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = parse(req.url ?? "/", true);
  handle(req, res, parsedUrl);
}

app.prepare().then(() => {
  const io = new Server({
    cors: {
      origin: true,
      credentials: true,
    },
  });

  attachSocket(io);

  const httpServer = createServer(requestHandler);
  io.attach(httpServer);
  httpServer.listen(httpPort, hostname, () => {
    console.log(`Ready http://localhost:${httpPort}`);
  });

  if (!dev) {
    return;
  }

  try {
    const httpsServer = createHttpsServer(loadDevCertificates(), requestHandler);
    io.attach(httpsServer);
    httpsServer.listen(httpsPort, hostname, () => {
      console.log(`Ready https://localhost:${httpsPort}`);
      for (const address of localAddresses()) {
        console.log(`Ready https://${address}:${httpsPort}`);
      }
    });
  } catch (error) {
    console.error("HTTPS unavailable", error);
  }
});
