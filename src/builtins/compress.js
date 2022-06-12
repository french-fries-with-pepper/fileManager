import { createReadStream, createWriteStream } from "fs";
import * as zlib from "zlib";

export const compressBrotli = async (inputPath, outPath) => {
  return new Promise((resolve, reject) => {
    const readSteam = createReadStream(inputPath);
    const writeStream = createWriteStream(outPath);
    const gzipStream = zlib.createBrotliCompress();

    readSteam.on("error", (err) => reject(err));
    writeStream.on("error", (err) => reject(err));

    readSteam.pipe(gzipStream).pipe(writeStream);
    gzipStream.on("end", () => resolve());
  });
};
