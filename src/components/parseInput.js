export const parseInput = (str) => {
  if (str.trim() ==="") return { command: "", args: "" };
  const arr = str.match(/\\?.|^$/g).reduce(
    (p, c) => {
      if (c === '"') {
        p.quote ^= 1;
      } else if (!p.quote && c === " ") {
        p.a.push("");
      } else {
        p.a[p.a.length - 1] += c.replace(/\\(.)/, "$1");
      }
      return p;
    },
    { a: [""] }
  ).a;
  const command = arr[0];
  const args = arr.slice(1);
  return { command, args };
};
