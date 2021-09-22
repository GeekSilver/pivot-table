import { React, Fragment } from "react";
import {
  checkIfArrayIncludesValue,
  normalizeData,
  preparePrimaryKey,
  sumOfSales,
  normalizeCategoryAndSubCategoryDataOnly,
} from "../functions";

const RowEntry = ({ categories, subCategories, JSONData, states }) => {
  let categoryTotalSales = 0;

  const calculateTotalSalesPerCategory = (singleCategorySales) => {
    categoryTotalSales += singleCategorySales;
  };

  const resetCategoryTotalSalesToZero = () => {
    categoryTotalSales = 0;
  };

  const subCategoryRowSpan = (categoryIndex) => {
    let span = 0;
    let subCategoriesNames = [];

    subCategories.forEach((subCategory) => {
      if (!checkIfArrayIncludesValue(subCategoriesNames, subCategory.name)) {
        span = subCategory.categoryId === categoryIndex ? span + 1 : span;
        /**
         * increment spanned rows by one if the subCategory belongs to the category under iteration
         */
        subCategoriesNames.push(subCategory.name);
      }
    });

    return span;
  };

  // obtain subCategories that belong of a category
  const subCategoriesOfCategory = (indexOfCategory) => {
    let subCategoriesOfACategory = [];
    // iterate through subCategories checking which have CategoryId matching the indexOfCategory
    subCategories.forEach((subCategory) => {
      if (subCategory.categoryId === indexOfCategory) {
        if (
          !checkIfArrayIncludesValue(subCategoriesOfACategory, subCategory.name)
        ) {
          subCategoriesOfACategory.push(subCategory.name);
        }
      }
    });
    return subCategoriesOfACategory;
  };

  return categories.map((category, index) => (
    <Fragment key={`${category}-fragment`}>
      <tr key={`category_${index}`} rowSpan={subCategoryRowSpan(index)}>
        <td
          key={`${category}-td-category`}
          style={{ display: "inline-block" }}
          className="category-column"
        >
          {category}
        </td>
        <td key={`${category}-${index}-td-subCategory`}>
          {subCategoriesOfCategory(index).map((subCategoryName) => (
            <p key={`${category}-${subCategoryName}-p`}> {subCategoryName} </p>
          ))}
        </td>

        {states.map((state) => (
          <td key={`${category}-${state}-td`}>
            {subCategoriesOfCategory(index).map((subCategoryName) => (
              <p key={`${category}-${state}-${subCategoryName}-p`}>
                {Math.round(
                  sumOfSales(
                    normalizeData(JSONData, [category, subCategoryName, state])
                  )[preparePrimaryKey([category, subCategoryName, state])]
                )}
              </p>
            ))}
          </td>
        ))}
        <td key={`${category}-td-sumOfSales`}>
          {subCategoriesOfCategory(index).map((subCategoryName) => (
            <p key={`${category}-td-sumOfSales-${subCategoryName}-p`}>
              {Math.round(
                sumOfSales(
                  normalizeCategoryAndSubCategoryDataOnly(JSONData, [
                    category,
                    subCategoryName,
                  ])
                )[preparePrimaryKey([category, subCategoryName])]
              )}
            </p>
          ))}
        </td>
      </tr>
      <tr key={`${category}-state-totals-row`} className="totals-row">
        <td colSpan="2" key={`${category}-state-totals-td`}>
          {category} totals{" "}
        </td>
        {states.map((state) => (
          <td
            key={`${category}-state-sales-sum-td-${state}`}
            data-uid={`category-state-total-sales-${preparePrimaryKey([
              category,
              state,
            ])}`}
          >
            {
              // add each category's total sales to categoryTotalSales
              calculateTotalSalesPerCategory(
                Math.round(
                  sumOfSales(normalizeData(JSONData, [category, state]))[
                    preparePrimaryKey([category, state])
                  ]
                )
              )
            }
            {Math.round(
              sumOfSales(normalizeData(JSONData, [category, state]))[
                preparePrimaryKey([category, state])
              ]
            )}
          </td>
        ))}
        <td key={`${category}-sales-totals-`}>{categoryTotalSales}</td>
      </tr>
      {
        //reset categoryTotalSales to zero before moving to next category
        resetCategoryTotalSalesToZero()
      }
    </Fragment>
  ));
};

export default RowEntry;
