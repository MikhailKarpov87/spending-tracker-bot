module.exports = (() => {
  const nowDate = new Date();

  return [
    { category: 'Category1', amount: 34, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    {
      category: 'Category1',
      amount: 34,
      notes: 'test notes',
      receiptImageUrl: 'http://testurl',
      userId: '42',
      createdAt: nowDate,
    },
    { category: 'Category1', amount: 34, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 42, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category2', amount: 3400, notes: 'test notes2', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    {
      category: 'Category1',
      amount: 340,
      notes: 'test notes',
      receiptImageUrl: 'http://testurl',
      userId: '42',
      createdAt: nowDate,
    },
    { category: 'Category1', amount: 142, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 230, notes: 'test notes2', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 111, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 31, notes: 'test notes2', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category2', amount: 1, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 34, notes: 'test notes', receiptImageUrl: '', userId: '42', createdAt: nowDate },
    { category: 'Category1', amount: 34, notes: 'test notes', receiptImageUrl: '', userId: '24', createdAt: nowDate },
  ];
})();
