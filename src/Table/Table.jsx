import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <div key={country.country} className="table_country">
          <div>{country.country}</div>
          <div>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;