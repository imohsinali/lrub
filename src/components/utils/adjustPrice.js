export const adjustPrice = (price, roundPrice) => {
  if (price > roundPrice) {
    return ((price - roundPrice) * 10 ** 18);
  } else if (price < roundPrice) return ((roundPrice - price) * 10 ** 18);
};
