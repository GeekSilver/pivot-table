import React from "react";
import { render } from "@testing-library/react";

import Table from "./Table";
import JSONData from "../data";
import {
  createEntitiesFromJSONData,
  preparePrimaryKey,
  normalizeData,
  sumOfSales,
} from "../functions";

describe("Grand Total sales displayed on table in browser", () => {
  
  let grandTotalSalesFromSumOfSalesFunction = 0;
  beforeAll(() => {
      const { states } = createEntitiesFromJSONData(JSONData);
    states.forEach((state) => {
      grandTotalSalesFromSumOfSalesFunction += Math.round(
        sumOfSales(normalizeData(JSONData, [state]))[preparePrimaryKey([state])]
      );
    });
      
  });
    
  it("should be equal to grand Total sales returned by sumOfSales function", () => {
    const {container} = render(<Table JSONData={JSONData} />);
    const grandTotalSalesValueDisplayedOnTable = Math.round(
      container.querySelector("#grand-total-sales").innerHTML
    );
    expect(grandTotalSalesValueDisplayedOnTable).toEqual(
      grandTotalSalesFromSumOfSalesFunction
    );
  });
});
