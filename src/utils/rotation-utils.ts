const multiplier = Math.PI / 180;
export const degreeToRadix = (degree: number): number => {
  return degree * multiplier;
};

export const degreeToPercentage = (degree: number): number => {
  return (180 - degree) / 180;
};

export const degreeToPercentageAbs = (degree: number): number => {
  return Math.abs(degreeToPercentage(degree));
};
