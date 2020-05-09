import { SceneContextMessageUpdate } from 'telegraf';

interface SessionObject {
  messageText: string;
  imageUrl: string;
  amount: number;
  category: string | RegExpExecArray;
}

interface DbObject {
  [key: string]: Function;
}

interface CustomSceneContext extends SceneContextMessageUpdate {
  session: SessionObject;
  db: DbObject;
}

interface ReportsObject {
  reportLabel: string;
  reportGetFunction: string;
}

interface OperationObject {
  _id: string;
  userId?: string;
  createdAt: string;
  category: string;
  amount: number;
  notes: string;
}

interface UserObject {
  name: string;
  userId: string;
  categories: Array<string>;
}

export { CustomSceneContext, ReportsObject, SessionObject, OperationObject, UserObject };
