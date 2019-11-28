export const exturl = (s: string, sel: string): boolean => {
  const sarr = s.split("/");
  if (sarr.length < 5) {
    return false;
  } else {
    return sarr[4].split("?")[0] === sel;
  }
};
