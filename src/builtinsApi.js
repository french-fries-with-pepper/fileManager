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
import { help } from "./help.js";
import { startMessage } from "./info.js";

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
      "help"
    ];
  }

  getPath() {
    return this.currentPath;
  }

  parseFileName = (current, str) => {
    return path.isAbsolute(str) ? str : path.resolve(path.join(current, str));
  };

  help() {
    console.log(startMessage.text);
    printPrompt(this.currentPath);
  }

  up(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.up);
      printPrompt(this.currentPath);
      return;
    }
    this.currentPath = path.resolve(path.join(this.currentPath, "../"));
    printPrompt(this.currentPath);
  }

  async ls(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.ls);
      printPrompt(this.currentPath);
      return;
    }
    await list(this.currentPath).then((arr) => {
      console.log(arr.join("\n"));
    });
    printPrompt(this.currentPath);
  }

  async cd(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.cd);
      printPrompt(this.currentPath);
      return;
    }
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
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.cat);
      printPrompt(this.currentPath);
      return;
    }
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    await cat(pathToFile).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }

  add(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.add);
      printPrompt(this.currentPath);
      return;
    }
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    writeFile(pathToFile, Buffer.alloc(0), (err) => {
      if (err) console.log("Operation failed");
      printPrompt(this.currentPath);
    });
  }

  async hash(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.hash);
      printPrompt(this.currentPath);
      return;
    }
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

  rn(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.rn);
      printPrompt(this.currentPath);
      return;
    }
    const oldPath = this.parseFileName(this.currentPath, args[0]);
    const newPath = this.parseFileName(this.currentPath, args[1]);
    rename(oldPath, newPath, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }

  cp(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.cp);
      printPrompt(this.currentPath);
      return;
    }
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

  mv(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.mv);
      printPrompt(this.currentPath);
      return;
    }
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

  rm(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.rm);
      printPrompt(this.currentPath);
      return;
    }
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    remove(pathToFile, {}, (err) => {
      if (err) {
        console.log("Operation failed");
      }
      printPrompt(this.currentPath);
    });
  }

  async compress(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.compress);
      printPrompt(this.currentPath);
      return;
    }
    const pathToFile = this.parseFileName(this.currentPath, args[0]);
    const pathToArchive = this.parseFileName(this.currentPath, args[1]);
    await compressBrotli(pathToFile, pathToArchive).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }

  async decompress(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.decompress);
      printPrompt(this.currentPath);
      return;
    }
    const pathToArchive = this.parseFileName(this.currentPath, args[0]);
    const pathToFile = this.parseFileName(this.currentPath, args[1]);
    await decompressBrotli(pathToArchive, pathToFile).catch((err) => {
      console.log("Operation failed");
    });
    printPrompt(this.currentPath);
  }

  os(args) {
    if (args[args.length - 1] === "-h" || args[args.length - 1] === "--help") {
      console.log(help.os);
      printPrompt(this.currentPath);
      return;
    }
    switch (args[0]) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "--cpus":
        const outArray = os.cpus().map((el) => {
          const res = {};
          res.model = el.model.split("@")[0].trim();
          res.clock = el.speed / 1000;
          return res;
        });
        console.log(`Total: ${outArray.length}`);
        console.log(outArray);
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
