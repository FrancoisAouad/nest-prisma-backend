export default () => {
  const {
    NODE_ENV = 'development',
    APP_PORT = 5021,
    SWAGGER_PORT = 5022,
    APP_NAME = 'nest-app',
    DB_HOST = 'localhost',
    DB_PORT = 27017,
    DB_USER = '',
    DB_PASSWORD = '',
    DB_DATABASE = 'nest-app',
    DB_URL = '',
    LOG_LEVEL = 'info',
    LOG_ENABLE_CONSOLE = '',
    LOG_FILE = '',
    METRICS_PORT = 8021,
    ACCESS_TOKEN_SECRET = 'secret',
    REFRESH_TOKEN_SECRET = 'secret',
    RESET_PASSWORD_TOKEN_SECRET = 'secret',
    NODEMAILER_USER = '',
    NODEMAILER_PASS = '',
    FACEBOOK_APP_ID = '',
    FACEBOOK_APP_SECRET = '',
    FACEBBOOK_CALLBACK_URL = '',
    GOOGLE_CLIENT_ID = '',
    GOOGLE_CLIENT_SECRET = '',
    GOOGLE_CALLBACK_URL = '',
    CACHE_PORT = '6379',
    CACHE_HOST = '127.0.0.1',
  } = process.env;

  const isConsoleEnabled = LOG_ENABLE_CONSOLE !== 'true';

  return {
    app: {
      nodeEnv: NODE_ENV,
      port: APP_PORT,
      name: APP_NAME,
    },
    swagger: {
      port: SWAGGER_PORT,
    },
    postgres: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      url: DB_URL,
    },
    cache: {
      host: CACHE_HOST,
      port: CACHE_PORT,
    },
    application_logging: {
      level: LOG_LEVEL,
      console: isConsoleEnabled,
      file: LOG_FILE,
    },
    jwt: {
      accessToken: ACCESS_TOKEN_SECRET,
      refreshToken: REFRESH_TOKEN_SECRET,
      resetPasswordToken: RESET_PASSWORD_TOKEN_SECRET,
    },
    prometheus: {
      port: METRICS_PORT,
    },
    nodemailer: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
    oauth: {
      facebook: {
        appId: FACEBOOK_APP_ID,
        appSecret: FACEBOOK_APP_SECRET,
        callbackUrl: FACEBBOOK_CALLBACK_URL,
      },
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackUrl: GOOGLE_CALLBACK_URL,
      },
    },
  };
};
