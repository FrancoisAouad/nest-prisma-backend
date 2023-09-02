import { Filter, Query } from '../global/global.interfaces';
import values from '../config/default-values';
import { PrismaSorting } from '../config/enums';

export const handleAggregationOptions = (options: Query): any => {
  if (Object.keys(options)?.length === 0) {
    return {};
  }
  // user input
  let { search, skip, sortBy } = options;
  let where = {};
  const { sort, limit, filter, currentCurrency } = options;
  if (filter) {
    const filterObj = JSON.parse(filter);
    where = createFilteringWhereClauseObject(filterObj);
  }
  if (currentCurrency) {
    where['currency'] = currentCurrency;
  }
  // pagination details
  skip = skip ? Number(skip) : 0;
  search = search ? search : undefined;
  sortBy = sortBy && values().allowedSortingFields.includes(sortBy) ? sortBy.toLowerCase() : 'name';
  const sortValue = sortBy.toLowerCase() === 'asc' ? PrismaSorting.ASC : PrismaSorting.DESC;

  const take = limit ? Number(limit) : 10;
  // order by for sorting
  const orderBy = sort && values().alloweSorting.includes(sort) ? { [sortBy]: sortValue } : { name: 'asc' };
  // handling filtering and search
  return { where, orderBy, skip, take };
};

const createFilteringWhereClauseObject = (filter: Filter) => {
  const filterLength = Object.keys(filter)?.length;

  switch (filterLength) {
    case 0:
      return {};
    // filter by price or name
    case 1:
      let obj = {};
      const data = handleFilterKeys(filter);
      if (data && !Object.keys(data).includes('name')) {
        obj['price'] = { ...data };
      } else {
        obj = { ...data };
      }
      return obj;
    // filter by price and name
    case 2:
      const nameFilter = handleFilterKeys({ name: filter?.name });
      const priceFilter = handleFilterKeys({ price: filter?.price });
      return { ...priceFilter, ...nameFilter };
  }
};

const handleFilterKeys = (filter: any) => {
  const keyName = Object.keys(filter).toString();

  const value = filter[keyName];
  let obj = {};
  if (keyName === 'name') {
    obj = { name: value };
  } else if (keyName === 'price') {
    const operationObj = filter[keyName];
    const operation = Object.keys(operationObj).toString().toLowerCase();
    if (!values().allowedOperations.includes(operation)) {
      throw new Error('Invalid operation');
    }
    const condition = generatePriceKeyValueForFilter(operationObj, operation);
    return (obj = { ...condition });
  }
  return obj;
};

const generatePriceKeyValueForFilter = (operationObj: any, operation: any) => {
  switch (operation) {
    case 'gt':
      const firstVal = operationObj[operation].toString();
      return { gte: firstVal || 0 };

    case 'lt':
      const secondVal = operationObj[operation].toString();
      return { lte: secondVal || Number.MAX_VALUE };

    case 'btw':
      const min = operationObj[operation][0];
      const max = operationObj[operation][1];
      return { AND: [{ gte: min || 0 }, { lte: max || Number.MAX_VALUE }] };
  }
};
