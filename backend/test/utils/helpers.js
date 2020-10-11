const getCategoriesNumFromOperations = operations =>
  operations.reduce((acc, operation) => {
    !acc.includes(operation.category) && acc.push(operation.category);
    return acc;
  }, []).length;

const createRandomDateTimeWithOffset = offsetInDays => {
  const randomSecondsOffset = Math.floor(Math.random() * offsetInDays * 86400 * 1000);
  const currentDateTime = Math.floor(new Date().getTime());
  const date = new Date(currentDateTime - randomSecondsOffset);
  return date;
};

module.exports = { getCategoriesNumFromOperations, createRandomDateTimeWithOffset };
