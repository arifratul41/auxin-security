import Papa from "papaparse";

async function fetchCsv(fileName) {
  const response = await fetch(fileName);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(result.value);
}

async function GetData(fileName) {
  return Papa.parse(await fetchCsv(fileName));
}

export function dataReader() {
  return GetData("covidData.csv");
}

export function countryDataReader() {
  return GetData("country.csv");
}
