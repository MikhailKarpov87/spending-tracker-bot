declare namespace NodeJS {
  export interface Global {
    __DB_URL__: string;
  }

  export interface ProcessEnv {
    NODE_ENV: string;
    MONGO_URI?: string;
  }
}
