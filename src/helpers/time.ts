export const getDiffSecBetweenNow = (date: Date) => {
  const now = new Date();

  return Math.abs((now.getTime() - date.getTime()) / 1000);
};
