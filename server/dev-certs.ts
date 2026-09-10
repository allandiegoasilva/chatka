import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { networkInterfaces } from "node:os";
import path from "node:path";

function localHosts() {
  const extra = (process.env.DEV_HOSTS || "192.168.0.141")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const hosts = ["localhost", "127.0.0.1", ...extra];

  for (const list of Object.values(networkInterfaces())) {
    for (const item of list ?? []) {
      if ((item.family === "IPv4" || item.family === 4) && !item.internal) {
        hosts.push(item.address);
      }
    }
  }

  return [...new Set(hosts)];
}

export function localAddresses() {
  return localHosts().filter((host) => /^\d+\.\d+\.\d+\.\d+$/.test(host));
}

export function loadDevCertificates() {
  const dir = path.join(process.cwd(), ".certs");
  const keyPath = path.join(dir, "dev.key");
  const certPath = path.join(dir, "dev.crt");

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    mkdirSync(dir, { recursive: true });
    const san = localHosts()
      .map((host) =>
        /^\d+\.\d+\.\d+\.\d+$/.test(host) ? `IP:${host}` : `DNS:${host}`,
      )
      .join(",");

    execFileSync("openssl", [
      "req",
      "-x509",
      "-newkey",
      "rsa:2048",
      "-sha256",
      "-nodes",
      "-days",
      "365",
      "-subj",
      "/CN=localhost",
      "-addext",
      `subjectAltName=${san}`,
      "-keyout",
      keyPath,
      "-out",
      certPath,
    ]);
  }

  return {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  };
}
