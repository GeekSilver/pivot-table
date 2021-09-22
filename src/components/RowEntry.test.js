import React from "react";
import { render } from "@testing-library/react";

import RowEntry from "./RowEntry";
import {
  normalizeData,
  preparePrimaryKey,
  sumOfSales,
  createEntitiesFromJSONData,
} from "../functions";
import JSONData from "../data";

describe("Total sales of a category per state displayed on browser", () => {
  let dataUid;
  let { states, subCategories, categories } =
    createEntitiesFromJSONData(JSONData);

  it("should be equal to total sales in a state per category from sumOfSales function", () => {
    const { container } = render(
      <RowEntry
        categories={categories}
        subCategories={subCategories}
        states={states}
        JSONData={JSONData}
      />
    );
    categories.forEach((category) => {
      states.forEach((state) => {
        dataUid = `[data-uid='category-state-total-sales-${preparePrimaryKey([
          category,
          state,
        ])}']`;
        expect(
          Math.round(
            sumOfSales(normalizeData(JSONData, [category, state]))[
              preparePrimaryKey([category, state])
            ]
          )
        ).toEqual(parseInt(container.querySelector(dataUid).innerHTML));
      });
    });
  });
});
