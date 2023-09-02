export default () => ({
  userAlreadyExists: {
    status: 409,
    errorCode: 'conflict',
    errorMessage: {
      en: 'User already exists',
      fr: "L'utilisateur existe déjà",
      ar: 'المستخدم موجود اصلا',
    },
  },
  passwordDontMatch: {
    status: 400,
    errorCode: 'badRequest',
    errorMessage: {
      en: 'Passwords do not match',
      fr: 'Les mots de passe ne correspondent pas',
      ar: 'كلمة المرور غير مطابقة',
    },
  },
  usernameMustBeUnique: {
    status: 409,
    errorCode: 'conflict',
    errorMessage: {
      en: 'Username must be unique',
      fr: "Le nom d'utilisateur doit être unique",
      ar: 'يجب أن يكون اسم المستخدم فريدًا',
    },
  },
  userNotFound: {
    status: 404,
    errorCode: 'notFound',
    errorMessage: {
      en: 'User not found',
      fr: 'Utilisateur non trouvé',
      ar: 'لم يتم العثور على المستخدم',
    },
  },
  wrongPassword: {
    status: 401,
    errorCode: 'unauthorized',
    errorMessage: {
      en: 'Wrong email/password',
      fr: 'Mauvais email/mot de passe',
      ar: 'البريد الإلكتروني / كلمة المرور خاطئة',
    },
  },
});
