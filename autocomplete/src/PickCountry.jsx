/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import './App.css'
import {useEffect, useState} from "react";
import axios from 'axios';

function PickCountry({
    selectableCountries = [],
    includeFlags = true,
                      }) {

    const [countries, setCountries] = useState([
        {
            name: "Loading...",
            flag: "🔄"
        }
    ]);

    useEffect(() => {
        if (Array.isArray(selectableCountries) && selectableCountries.length === 0) {
            axios.get("https://restcountries.com/v3.1/all", {
                params: {
                    fields: `name${includeFlags ? ",flag" : ""}`
                }
            }).then((response) => {
                setCountries(response.data.map((country) =>
                    ({
                        name: country.name.common,
                        flag: country.flag,
                    })
                ));
            })
        }
        else {
            if (!Array.isArray(selectableCountries)) {
                setCountries([
                    {
                        name: "Invalid selectableCountries Input",
                        flag: "⚠️"
                    }
                ]);
                console.warn("selectableCountries received a non-array input.")
            }
            // An array of strings
            else if (selectableCountries.every(item => typeof item === "string")) {
                setCountries(selectableCountries.map(item => ({ name: item })));
            }
            // An array of objects. We assume the user labeled everything correctly.
            else if (selectableCountries.every(item => item && typeof item === "object" && !Array.isArray(item))) {
                setCountries(selectableCountries)
            }
            // No clue what the user gave us
            else {
                setCountries([
                    {
                        name: "Invalid selectableCountries Input",
                        flag: "⚠️"
                    }
                ]);
                console.warn("selectableCountries received an input that isn't an array of strings, nor an array of objects.")
            }
        }
    }, []);

  return (
    <>
      <div css={boxCss}>
          <h2>Select Country</h2>
          <input type="text" list="countries"/>

          <datalist id="countries">
              {countries.map((country) => (
                  <option key={country.name} value={`${(includeFlags && country.flag !== null) ? country.flag : ""} ${country.name}`}></option>
              ))}
          </datalist>
      </div>
    </>
  )
}

const boxCss = css`
    border: 0.5ch double black;
    border-radius: 0.5em;
    color: black;
    background-color: white;
    padding: 0.5em;
`;

export default PickCountry
