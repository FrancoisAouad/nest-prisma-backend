/**
 * @enum {string} - Enum representing user roles
 * @typedef {object} Role
 * @property {string} SUPER_ADMIN
 * @property {string} BUYER
 * @property {string} USER
 * @property {string} SELLER
 */

export enum Role {
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
  BUYER = 'buyer',
  SELLER = 'seller',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} AuthenticationStrategy
 * @property {string} GOOGLE
 * @property {string} FACEBOOK
 * @property {string} EMAIL
 */
export enum AuthenticationStrategy {
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} FacebookStrategyScope
 * @property {string} EMAIL
 */
export enum FacebookStrategyScope {
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} FacebookStrategyProfileFieldF
 * @property {string} EMAILS
 * @property {string} NAME
 */
export enum FacebookStrategyProfileField {
  EMAILS = 'emails',
  NAME = 'name',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} GoogleStrategyScope
 * @property {string} PROFILE
 * @property {string} EMAIL
 */
export enum GoogleStrategyScope {
  PROFILE = 'profile',
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} LoginType
 * @property {string} GOOGLE
 * @property {string} FACEBOOK
 * @property {string} EMAIL
 */
export enum LoginType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
}

/**
 * @enum {string} - Enum representing login types for the passport authentication strategy
 * @typedef {object} NodemailerService
 * @property {string} GMAIL
 */
export enum NodemailerService {
  GMAIL = 'gmail',
}

export enum PrismaSorting {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SupportedCurrency {
  USD = 'usd',
  LBP = 'lbp',
  TRL = 'trl',
  YEN = 'yen',
  EUR = 'eur',
}
