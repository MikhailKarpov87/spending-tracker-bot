interface OperationObject {
  _id: string;
  category: string;
  amount: number;
  createdAt: string;
  notes: string;
}

interface InfoObject {
  id: string;
  name: string;
}

export { OperationObject, InfoObject };
