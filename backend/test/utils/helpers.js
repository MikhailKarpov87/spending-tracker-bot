const getCategoriesNumFromOperations = operations =>
  operations.reduce((acc, operation) => {
    !acc.includes(operation.category) && acc.push(operation.category);
    return acc;
  }, []).length;

module.exports = { getCategoriesNumFromOperations };
