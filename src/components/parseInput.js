export const parseInput = (str) => {
  if (str[str.length - 1] === "\n") str = str.slice(0, -1);
  const arr = str.split(" ");
  const command = arr[0];
  const args = arr.slice(1);
  return { command, args };
};
