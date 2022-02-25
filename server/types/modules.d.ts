declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    DB_NAME: string
    DB_USER: string
    DB_PASSWORD: string
    DB_HOST: string
    DB_PORT: string
    SECRET_KEY: string
    JWT_ACCESS_KEY: string
    JWT_REFRESH_KEY: string
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
    SERVER_URL: string
    CLIENT_URL: string
  }
}
