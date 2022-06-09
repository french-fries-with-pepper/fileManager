export const parseArgs = () => {
    const res = [];
    const n = process.argv.length;
    for (let i = 2; i < n; i++) {
      const currentArgs = process.argv[i].slice(2).split('=');
      res.push(currentArgs);
    }
    return res;
};