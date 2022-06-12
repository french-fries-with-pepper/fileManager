export const printPrompt = (currentPath) => {
  process.stdout.write(
    "\x1b[33m" + `You are currently in ${currentPath}\n-> ` + "\x1b[0m"
  );
};
