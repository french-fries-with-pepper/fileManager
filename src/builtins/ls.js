import { readdir, lstat } from "fs/promises";
import * as path from "path";

export const list = async (pathToDir) => {
  try {
    const arr = await readdir(pathToDir);
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      const stat = await lstat(path.resolve(pathToDir, arr[i]));
      if (stat.isDirectory()) {
        res.push(`\x1b[32m${arr[i]}\x1b[0m`);
      } else {
        res.push(arr[i]);
      }
    }
    return res;
  } catch (err) {
    console.error(err);
  }
};
