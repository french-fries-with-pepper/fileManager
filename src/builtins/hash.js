const { createHash } = await import("crypto");
import { createReadStream } from "fs";

export const calculateHash = async (pathToFile) => {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(pathToFile);
    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
};
