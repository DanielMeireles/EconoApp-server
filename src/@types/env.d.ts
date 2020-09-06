declare namespace NodeJS {
  export interface ProcessEnv {
    APP_API_URL: string;
    APP_WEB_URL: string;
    NODE_ENV: string;
    APP_SECRET: string;
    APP_EXPIRES_IN: string;
    APP_PORT: string;
    MAIL_DRIVER: string;
    MAIL_FROM: string;
    MAIL_NAME: string;
    STORAGE_DRIVER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_NAME: string;
    MONGO_HOST: string;
    MONGO_PORT: string;
    MONGO_USER: string;
    MONGO_PASS: string;
    MONGO_NAME: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASS: string;
    AWS_BUCKET: string;
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SES_API_VERSION: string;
    AWS_SES_REGION: string;
  }
}
