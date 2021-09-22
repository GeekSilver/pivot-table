export const createEntitiesFromJSONData = (JSONData) => {
  let categories = [];
  let subCategories = [];
  let states = [];
  let orders = [];
  let categoryId, subCategoryId, stateId;

  JSONData.forEach((order) => {
    categoryId = findItemId(categories, order.category);
    stateId = findItemId(states, order.state);
    subCategoryId = findSubCategoryId(subCategories, order.subCategory);

    if (!checkIfArrayIncludesValue(categories, order.category)) {
      categories.push(order.category);
    }

    if (!checkIfArrayIncludesValue(subCategories, order.subCategory)) {
      subCategories.push({ name: order.subCategory, categoryId });
    }

    if (!checkIfArrayIncludesValue(states, order.state)) {
      states.push(order.state);
    }

    orders.push({
      Id: order.orderId,
      sales: order.sales,
      categoryId,
      subCategoryId,
      stateId,
    });
  });

  return {
    categories,
    subCategories,
    states,
    orders,
  };
};

export const findItemId = (array, item) => array.indexOf(item);

export const checkIfArrayIncludesValue = (array, value) =>
  array.includes(value);

export const findSubCategoryId = (subCategories, subCategory) => {
  subCategories.forEach((subCategoryEntry, index) => {
    if (subCategoryEntry.name === subCategory) return index;
  });
};

// added later
export const normalizeData = (JSONData, arrayOfColumnDimensions) => {
  let primaryKey = preparePrimaryKey(arrayOfColumnDimensions);

  let normalizedDataJSON = {}; // object that 'll hold normalized data
  normalizedDataJSON[primaryKey] = [];

  /** 
   *  if arrayOfColumnDimensions has 3 elements then primaryKey is made up of: category, subCategory and state
   *  else if arrayOfColumnDimensions has 2 elements then primaryKey is made up of (Category and state)
   *  else if arrayOfColumnsDimensions has 1 element then the primaryKey is made up of state only
   */
  let arrayOfColumnDimensionsLength = arrayOfColumnDimensions.length;

  JSONData.forEach((order) => {
    let currentOrderPrimaryKey;
    if (arrayOfColumnDimensionsLength === 3) {
      currentOrderPrimaryKey = preparePrimaryKey([
        order.category,
        order.subCategory,
        order.state,
      ]);
    } else if (arrayOfColumnDimensionsLength === 2) {
      currentOrderPrimaryKey = preparePrimaryKey([order.category, order.state]);
    } else if (arrayOfColumnDimensionsLength === 1) {
      currentOrderPrimaryKey = preparePrimaryKey([order.state]);
    }

    if (currentOrderPrimaryKey === primaryKey) {
      normalizedDataJSON[primaryKey].push({
        orderId: order.orderId,
        sales: order.sales,
      });
    }
  });

  return normalizedDataJSON;
  /**
   * normalizedDataJSON is structured like this
   * normalizedDataJSON: {
   * category_subCategory_state1: [{orderId: , sales: }],
   * category_subCategory_state2: [{orderId: , sales: }]
   * }
   * */
};

// normalize Category & subCategory column dimensions only
export const normalizeCategoryAndSubCategoryDataOnly = (
  JSONData,
  arrayOfColumnDimensions
) => {
  let primaryKey = preparePrimaryKey(arrayOfColumnDimensions);

  let normalizedDataJSON = {}; // object that 'll hold normalized data
  normalizedDataJSON[primaryKey] = [];

  JSONData.forEach((order) => {
    let currentOrderPrimaryKey = preparePrimaryKey([
      order.category,
      order.subCategory,
    ]);

    if (currentOrderPrimaryKey === primaryKey) {
      normalizedDataJSON[primaryKey].push({
        orderId: order.orderId,
        sales: order.sales,
      });
    }
  });

  return normalizedDataJSON;
  /**
   * normalizedDataJSON is structured like this
   * normalizedDataJSON: {
   * category_subCategory1: [{orderId: , sales: }],
   * category_subCategory2: [{orderId: , sales: }]
   * }
   * */
};

export const preparePrimaryKey = (arrayOfColumnDimensions) => {
  /**
   * parse spaces in column dimensions and join column dimensions using "_" to form object keys (primaryKey)
   */
  return arrayOfColumnDimensions
    .toString()
    .replaceAll(",", "_")
    .replaceAll(" ", "&")
    .split("")
    .join("");
};

export const sumOfSales = (JSONData) => {
  /**
   * calculate sum of sales based on composite key (made up of a combination of column dimensions)
   */

  let sumObject = {};

  let sumHolder;
  Object.keys(JSONData).forEach((key) => {
    sumHolder = Number(0);

    JSONData[key].forEach((order, index) => {
      sumHolder += Number(order.sales);
    });

    sumObject[key] = sumHolder;
  });

  return sumObject;
};
