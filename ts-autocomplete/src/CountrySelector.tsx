/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

type Country = {
  name: string;
  flag?: string;
}

function CountrySelector({
  selectableCountries = [],
  includesFlags = true,
  onSubmit = () =>
    console.warn("Forgot to set onSubmit in PickCountry component"),
}: {
  selectableCountries?: Country[] | string[];
  includesFlags?: boolean;
  onSubmit?: (country?: Country) => void;
}) {
  const [countries, setCountries] = useState<Country[]>([
    {
      name: "Loading...",
      flag: "🔄",
    },
  ]);

  const [selectedCountry, setSelectedCountry] = useState<Country>();

  type APICountry = {
    name: {
      common: string;
    }
    flag: string;
  }

  useEffect(() => {
    if (
      selectableCountries.length === 0
    ) {
      axios
        .get<APICountry[]>("https://restcountries.com/v3.1/all", {
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

    const allArrayItemsAreStrings = selectableCountries.every(
      (item) => typeof item === "string",
    );
    if (allArrayItemsAreStrings) {
      setCountries(selectableCountries.map((item) => ({ name: item })));
      return;
    }

    const allArrayItemsAreObjects = selectableCountries.every(
      (item) => item && typeof item === "object" && !Array.isArray(item),
    ); // I was sure there was a nicer way to type-narrow to a custom type, but I can't remember it nor find it in the book.
    // If you remember what it is, please say so, I'd really appreciate it.
    if (allArrayItemsAreObjects) {
      setCountries(selectableCountries);
      return;
    }
  }, []);

  return (
    <>
      <Selector>
        <h2>Select Country</h2>
        <input
          type="text"
          list="countries"
          onChange={(event) => setSelectedCountry({ name: event.target.value })}
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
