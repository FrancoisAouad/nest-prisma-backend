export default () => ({
  categoryAlready: {
    status: 409,
    errorCode: 'conflict',
    errorMessage: {
      en: 'Category already exists',
      fr: 'Categorie existe déjà',
      ar: 'المستخدم موجود اصلا',
    },
  },
  categoryNotFound: {
    status: 404,
    errorCode: 'notFound',
    errorMessage: {
      en: 'Category not found',
      fr: 'Categorie non trouvé',
      ar: 'لم يتم العثور على المستخدم',
    },
  },
});
