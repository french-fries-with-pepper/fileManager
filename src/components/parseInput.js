export const parseInput = (str) => {
  const arr = str.trim().split(" ");
  const command = arr[0];
  const args = arr.slice(1);
  return { command, args };
};
