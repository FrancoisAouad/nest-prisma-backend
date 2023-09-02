/**
 * @enum {string} - Enum representing all routes for the auth controller
 * @typedef {object} NodemailerService
 * @property {string} LOGIN
 * @property {string} REGISTER
 * @property {string} FORGOT_PASSWORD
 * @property {string} LOGOUT
 * @property {string} VERIFY_ACCOUNT
 * @property {string} RESET_PASSWORD
 * @property {string} REFRESH_TOKEN
 * @property {string} FACEBOOK
 * @property {string} FACEBOOK_CALLBACK
 * @property {string} GOOGLE
 */
export enum AuthRoute {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  LOGOUT = 'logout',
  VERIFY_ACCOUNT = 'verify-account/:token',
  RESET_PASSWORD = 'reset-password/:token',
  REFRESH_TOKEN = 'refresh-token',
  FACEBOOK = 'facebook',
  FACEBOOK_CALLBACK = 'facebook/callback',
  GOOGLE = 'google',
  GOOGLE_CALLBACK = 'google/callback',
}

/**
 * @enum {string} - Enum representing all routes for the auth controller
 * @typedef {object} NodemailerService
 * @property {string} GMAIL
 */
export enum CategoryRoute {
  UPDATE = ':id',
  FIND_BY_ID = ':id',
  DELETE = ':id',
}
