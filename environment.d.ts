declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        MONGO_URL: string;
        ACCESS_TOKEN_SECRET: string;
        JWT_EXPIRATION: string;
    }
}