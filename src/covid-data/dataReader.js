import Papa from 'papaparse';

async function fetchCsv() {
    const response = await fetch('covidData.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(result.value);
}

async function GetData() {
    return Papa.parse(await fetchCsv());
}

export function dataReader(){
    return GetData();
}