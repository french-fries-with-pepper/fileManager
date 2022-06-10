import { readdir } from "fs/promises";
import * as path from "path";

export const changeDir = async (current, pathToDir) => {
    //if(!pathToDir) throw new Error();
  let optimisedPath;
  if (path.isAbsolute(pathToDir)) {
    optimisedPath = pathToDir;
  } else {
    optimisedPath = path.resolve(path.join(current, pathToDir));
  }
  try {
    await readdir(optimisedPath);
  } catch (err) {
    throw err;
  }

  return optimisedPath;
};
