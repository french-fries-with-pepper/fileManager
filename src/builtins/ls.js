import { readdir } from "fs/promises";

export const list = async (pathToDir) => {
  try {
    return await readdir(pathToDir);
  } catch (err) {
    console.error(err);
  }
};
