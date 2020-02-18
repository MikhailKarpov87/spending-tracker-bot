const { reports } = require('./constants');

const reportLabels = reports.map(report => report.reportLabel);
const mainMenuItems = [['Add operation'], reportLabels];
const operationAddedMenuItems = ['Back', 'Add another'];
const backMenuItem = ['Back'];
const addAnotherOperationMenuItem = ['Add another'];

module.exports = { mainMenuItems, operationAddedMenuItems, backMenuItem, addAnotherOperationMenuItem };
