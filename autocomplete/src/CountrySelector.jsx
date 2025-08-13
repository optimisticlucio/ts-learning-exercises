/** @jsxImportSource @emotion/react */
import { styled } from "@emotion/styled";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CountrySelector({
  selectableCountries = [],
  includesFlags = true,
  onSubmit = () =>
    console.warn("Forgot to set onSubmit in PickCountry component"),
}) {
  const [countries, setCountries] = useState([
    {
      name: "Loading...",
      flag: "🔄",
    },
  ]);

  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    if (
      Array.isArray(selectableCountries) &&
      selectableCountries.length === 0
    ) {
      axios
        .get("https://restcountries.com/v3.1/all", {
          params: {
            fields: `name${includesFlags ? ",flag" : ""}`,
          },
        })
        .then((response) => {
          setCountries(
            response.data.map((country) => ({
              name: country.name.common,
              flag: country.flag,
            })),
          );
        });
      return;
    }
    if (!Array.isArray(selectableCountries)) {
      setCountries([
        {
          name: "CountrySelector given non-array input as selectableCountries",
          flag: "⚠️",
        },
      ]);
      console.warn("selectableCountries received a non-array input.");
      return;
    }

    let allArrayItemsAreStrings = selectableCountries.every(
      (item) => typeof item === "string",
    );
    if (allArrayItemsAreStrings) {
      setCountries(selectableCountries.map((item) => ({ name: item })));
      return;
    }

    let allArrayItemsAreObjects = selectableCountries.every(
      (item) => item && typeof item === "object" && !Array.isArray(item),
    );
    if (allArrayItemsAreObjects) {
      setCountries(selectableCountries);
      return;
    }

    setCountries([
      {
        name: "CountrySelector given invalid array as selectableCountries",
        flag: "⚠️",
      },
    ]);
    console.warn(
      "selectableCountries received an input that isn't an array of strings, nor an array of objects.",
    );
  }, []);

  return (
    <>
      <Selector>
        <h2>Select Country</h2>
        <input
          type="text"
          list="countries"
          onChange={(event) => setSelectedCountry(event.target.value)}
        />

        <datalist id="countries">
          {countries.map((country) => (
            <option
              key={country.name}
              value={`${includesFlags && country.flag !== null ? `${country.flag} ` : ""}${country.name}`}
            ></option>
          ))}
        </datalist>

        <button onClick={() => onSubmit(selectedCountry)}>Submit</button>
      </Selector>
    </>
  );
}

const Selector = styled.div`
  border: 0.5ch double black;
  border-radius: 0.5em;
  color: black;
  background-color: white;
  padding: 0.5em;
`;

export default CountrySelector;
