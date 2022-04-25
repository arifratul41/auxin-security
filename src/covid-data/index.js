import {Card, Chip, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Bar} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {dataReader} from "./dataReader";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false
        },
    },
};

function getCountryList(covidData){
    if(!covidData) return [];
    const countries = covidData?.data?.filter((datum) => !datum[0].startsWith("OWID") && !datum[0].startsWith("iso"))
                                    .map((datum) => {
                                        return {
                                            value: datum[0],
                                            label: datum[1]
                                        }
                                    });
    return [...new Set(countries?.map(JSON.stringify))]?.map(JSON.parse);
}

export default  function CovidData({}) {
    const [country, setCountry] = useState('');
    const [dataIndex, setDataIndex] = useState(3);
    const [dataLabel, setDataLabel] = useState("Infection Count");
    const [barColor, setBarColor] = useState("rgba(255, 99, 132, 0.5)")
    const [covidData, setCovidData] = useState([]);
    const [duration, setDuration] = useState('');

    useEffect(() => {
        dataReader().then((response) => setCovidData(response));
    },[])
    const countryData = covidData?.data?.filter((datum)=> datum[0]===country)
    const label = duration ? countryData?.map((datum) => datum[2]).slice(0, parseInt(duration)) 
                        : countryData?.map((datum) => datum[2]);

    const getViewedData = () => {
        const data =  countryData?.map((datum) => datum[dataIndex]);
        if(!duration) return data;
        console.log(data.slice(0, parseInt(duration)))
        return data.slice(0, parseInt(duration))
    }

    const barChartData = {
        labels: label,
        datasets: [
            {
                label: dataLabel,
                data: getViewedData(),
                backgroundColor: barColor,
            }
        ],
    }
    const handleChange = (event) => {
        setCountry(String(event.target.value));
    };
    return (
        <div>
            <Card className={`mx-auto w-2/3 mt-16 `}>
                <div className={`flex flex-row justify-end gap-2`}>
                    <div className={`mt-2.5`}>
                        <Chip onClick={(e) => {
                            setDataIndex(3);
                            setDataLabel("Infection Count");
                            setBarColor("rgba(255, 99, 132, 0.5)")
                        }} label="Infection" clickable={true} variant={"outlined"} />
                    </div>
                    <div className={`mt-2.5`}>
                        <Chip onClick={(e) => {
                            setDataIndex(4);
                            setDataLabel("Death Count");
                            setBarColor("rgba(0, 0, 0, 0.4)")
                        }} label="Death" clickable={true} variant={"outlined"}/>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-disabled-label">Country</InputLabel>
                            <Select
                                value={country}
                                label="Age"
                                onChange={handleChange}
                            >
                                {getCountryList(covidData)?.map((datum) => {
                                    return (
                                        <MenuItem value={datum.value}>{datum.label}</MenuItem>
                                    )
                                })} 
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Duration</InputLabel>
                            <Select
                                value={duration}
                                label="Duration"
                                onChange={(event) => {
                                    setDuration(event.target.value);
                                }}
                            >
                                
                                <MenuItem value={""}>Over All</MenuItem>
                                <MenuItem value={"7"}>Last One Week</MenuItem>
                                <MenuItem value={"30"}>Last One Month</MenuItem>
                                    
                                
                            </Select>
                        </FormControl>
                    </div>

                </div>
            </Card>
            <Card className={`w-2/3 mx-auto mt-5`}>
            <Bar options={options} data={barChartData}/>
            </Card>
        </div>
    )
}