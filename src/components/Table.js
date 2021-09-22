import React from "react";

import {
  createEntitiesFromJSONData,
  sumOfSales,
  preparePrimaryKey,
  normalizeData,
} from "../functions";
import RowEntry from "./RowEntry";

const Table = ({ JSONData }) => {
  const { categories, subCategories, states } =
    createEntitiesFromJSONData(JSONData);

  let grandTotalSales = 0;

  const calculateGrandTotalSales = (singleStatesTotalSales) => {
    grandTotalSales += singleStatesTotalSales;
  };

  return (
    <table cellSpacing="0" cellPadding="10">
      <thead>
        <tr>
          <th colSpan="2">PRODUCTS</th>
          <th colSpan={states.length + 1}>STATES</th>
        </tr>
        <tr>
          <td>Category</td>
          <td>Sub-Category</td>
          {states.map((state) => (
            <td key={state}>{state}</td>
          ))}
          <td>Grand Total</td>
        </tr>
      </thead>
      <tbody>
        <RowEntry
          categories={categories}
          subCategories={subCategories}
          JSONData={JSONData}
          states={states}
        />
        <tr className="totals-row" id="grand-totals-row" colSpan="100%">
          <td colSpan="2">Grand Total</td>
          {states.map((state) => (
            <td key={`${state}-grand-total`}>
              {
                // add each states total sales to grandTotalSales
                calculateGrandTotalSales(
                  Math.round(
                    sumOfSales(normalizeData(JSONData, [state]))[
                      preparePrimaryKey([state])
                    ]
                  )
                )
              }
              {Math.round(
                sumOfSales(normalizeData(JSONData, [state]))[
                  preparePrimaryKey([state])
                ]
              )}
            </td>
          ))}
          <td id="grand-total-sales">{grandTotalSales}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
