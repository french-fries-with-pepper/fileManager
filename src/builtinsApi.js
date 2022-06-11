import { printPrompt } from "./components/printPrompt.js";
import os from "os";
import * as path from "path";
import { rename, writeFile, cp as copy, rm as remove } from "fs";

import { list } from "./builtins/ls.js";
import { changeDir } from "./builtins/cd.js";
import { cat } from "./builtins/cat.js";
import { calculateHash } from "./builtins/hash.js";
import { compressBrotli } from "./builtins/compress.js";
import { decompressBrotli } from "./builtins/decompress.js";

export class BuiltinsApi {
  currentPath;
  builtinsArr;

  constructor() {
    this.currentPath = os.homedir();
    this.builtinsArr = [
      "up",
      "ls",
      "cd",
      "cat",
      "add",
      "hash",
      "rn",
      "cp",
      "mv",
      "rm",
      "compress",
      "decompress",
      "os",
    ];
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
  async rn(args) {
    const oldPath = this.parseFileName(this.currentPath, args[0]);
    const newPath = this.parseFileName(this.currentPath, args[1]);
    rename(oldPath, newPath, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }
  async cp(args) {
    const oldPath = this.parseFileName(this.currentPath, args[0]);
    const newPath = this.parseFileName(
      this.currentPath,
      path.join(args[1], path.basename(args[0]))
    );
    copy(oldPath, newPath, { recursive: true }, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }

  async mv(args) {
    const oldPath = this.parseFileName(this.currentPath, args[0]);
    const newPath = this.parseFileName(
      this.currentPath,
      path.join(args[1], path.basename(args[0]))
    );
    rename(oldPath, newPath, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }

  async rm(args) {
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    remove(pathToFile, {}, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }
  async compress(args) {
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    const pathToArchive = this.parseFileName(this.currentPath, args[1]);
    await compressBrotli(pathToFile, pathToArchive).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }
  async decompress(args) {
    const pathToArchive = this.parseFileName(this.currentPath, args[0]);
    const pathToFile = this.parseFileName(this.currentPath, args[1]);
    await decompressBrotli(pathToArchive, pathToFile).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }
  os(args) {
    switch (args[0]) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "--cpus":
        console.log(os.cpus());
        break;
      case "--homedir":
        console.log(os.homedir());
        break;
      case "--username":
        console.log(os.userInfo().username);
        break;
      case "--architecture":
        console.log(process.arch);
        break;
      default:
        console.log("Operation failed");
    }
    printPrompt(this.currentPath);
  }
}
