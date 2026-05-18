export const formatResult = (result) => {
  if (result === undefined || result === null) {
    return "";
  }

  return Number(result).toLocaleString();
};

export const clearExpression = () => {
  return "";
};