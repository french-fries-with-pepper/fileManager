import { parseArgs } from "./components/cliArgs.js";
import { exitHandler } from "./components/exitHandler.js";
import { printPrompt } from "./components/printPrompt.js";
import { parseInput } from "./components/parseInput.js";
import { homedir } from "os";
import { BuiltinsApi } from "./builtinsApi.js";

console.log("Starting...");
const argsArray = parseArgs();
const username =
  argsArray[0] ?? [0] === "username"
    ? argsArray[0][1] || "unknown user"
    : "unknown user";
const greeting = `Welcome to the File Manager, ${username}!`;
const exitMessage = `Thank you for using File Manager, ${username}`;
console.log(greeting);

process.on("SIGINT", () => exitHandler("\n"+exitMessage));
printPrompt(homedir());

const api = new BuiltinsApi();

process.stdin.on("data",(data) => {
  const dataString = data.toString();
  if (dataString === "exit\n") exitHandler(exitMessage);
  if (dataString === "clear\n"||dataString.charCodeAt(0)===0x0c){
    process.stdout.write('\x1Bc');
    printPrompt(api.getPath());
    return;
  }
  const { command, args } = parseInput(dataString);
  //console.log(`current command is ${command}`);
  //console.log(`args are ${args}`);

  if (!api.builtinsArr.includes(command)) {
    console.log("Invalid input");
    printPrompt(api.getPath());
  } else {
    api[command](args);
  }
});
