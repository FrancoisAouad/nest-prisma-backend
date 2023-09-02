export default () => ({
  productAlreadyExists: {
    status: 409,
    errorCode: 'conflict',
    errorMessage: {
      en: 'Product already exists',
      fr: 'Le produit existe déjà',
      ar: 'المستخدم موجود اصلا',
    },
  },
  productNotFound: {
    status: 404,
    errorCode: 'notFound',
    errorMessage: {
      en: 'Product not found',
      fr: 'Produit non trouvé',
      ar: 'لم يتم العثور على المستخدم',
    },
  },
});
