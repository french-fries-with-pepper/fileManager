import { printPrompt } from "./components/printPrompt.js";
import { homedir } from "os";
import * as path from "path";
import { createReadStream, writeFile } from "fs";

import { list } from "./builtins/ls.js";
import { changeDir } from "./builtins/cd.js";
import { cat } from "./builtins/cat.js";
import { calculateHash } from "./builtins/hash.js";
export class BuiltinsApi {
  currentPath;
  builtinsArr;

  constructor() {
    this.currentPath = homedir();
    this.builtinsArr = ["up", "ls", "cd", "cat", "add", "hash"];
  }

  getPath() {
    return this.currentPath;
  }

  parseFileName = (current, str) => {
    return path.isAbsolute(str) ? str : path.resolve(path.join(current, str));
  };

  up() {
    this.currentPath = path.resolve(path.join(this.currentPath, "../"));
    printPrompt(this.currentPath);
  }

  async ls() {
    await list(this.currentPath).then((arr) => {
      console.log(arr.join("\n"));
    });
    printPrompt(this.currentPath);
  }

  async cd(args) {
    await changeDir(this.currentPath, args[0])
      .then((newPath) => {
        this.currentPath = newPath;
      })
      .catch((e) => {
        console.log("Operation failed");
      });
    printPrompt(this.currentPath);
  }

  async cat(args) {
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    await cat(pathToFile).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }

  async add(args) {
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    writeFile(pathToFile, "", (err) => {
      if (err) console.log("Operation failed");
      printPrompt(this.currentPath);
    });
  }

  async hash(args) {
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    await calculateHash(pathToFile)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Operation failed");
      });
    printPrompt(this.currentPath);
  }
}
