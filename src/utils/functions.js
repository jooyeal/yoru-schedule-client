const conditions = [
  { name: "未対応", value: 1 },
  { name: "処理中", value: 2 },
  { name: "検討中", value: 3 },
  { name: "完了", value: 4 },
];

export const isEmpty = (value) => {
  if (
    value?.length === 0 ||
    value === [] ||
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return true;
  }
  return false;
};

export const dateFormatting = (value) => {
  const date = new Date(value);
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return formattedDate;
};

export const setTimeoutSelf = async (func) => {
  setTimeout(func, 500);
};

export const conditionSort = (array, asc) => {
  const returnArray = [...array];
  returnArray.sort((a, b) => {
    const leftValue = conditions.filter((c) => c.name === a.condition);
    const rightValue = conditions.filter((c) => c.name === b.condition);
    if (leftValue[0]?.value > rightValue[0]?.value) {
      return asc ? 1 : -1;
    } else if (leftValue[0]?.value < rightValue[0]?.value) {
      return asc ? -1 : 1;
    } else {
      return 0;
    }
  });
  return returnArray;
};
