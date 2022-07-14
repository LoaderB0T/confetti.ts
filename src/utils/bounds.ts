export const bounds = (value: number, min: number, max: number): number => {
  let val = value;
  while (val < min) {
    val += max;
  }
  while (val > max) {
    val -= max;
  }
  return val;
};
