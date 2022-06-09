import { printPrompt } from "./components/printPrompt.js";
import { homedir } from "os";
import * as path from "path";

import { list } from "./builtins/ls.js";

export class BuiltinsApi {
  currentPath;
  builtinsArr;

  constructor() {
    this.currentPath = homedir();
    this.builtinsArr = ["up", "ls"];
  }

  getPath() {
    return this.currentPath;
  }

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
}
