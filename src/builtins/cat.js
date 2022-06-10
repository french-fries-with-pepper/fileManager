import { createReadStream } from "fs";

export const cat = async (pathToFile) => {
  return new Promise((resolve, reject) => {
    console.log(pathToFile);
    const stream = createReadStream(pathToFile);
    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => process.stdout.write(chunk.toString()));
    stream.on("end", () => resolve());
  });
};
