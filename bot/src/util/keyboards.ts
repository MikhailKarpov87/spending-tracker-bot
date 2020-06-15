import { reports } from './constants';
import { ReportsObject } from '../types';

const reportLabels = reports.map((report: ReportsObject) => report.reportLabel);
const mainMenuItems = [['Add operation'], reportLabels];
const operationAddedMenuItems = ['Back', 'Add another'];
const backMenuItem = ['Back'];
const addAnotherOperationMenuItem = ['Add another'];

export { mainMenuItems, operationAddedMenuItems, backMenuItem, addAnotherOperationMenuItem };
