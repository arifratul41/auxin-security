import {Button, Chip, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Bar} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {countryDataReader, dataReader} from "./dataReader";
import {logout, useAuth} from "../auth";
import {useHistory} from "react-router";

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


export default  function CovidData() {
    const [country, setCountry] = useState('');
    const [dataIndex, setDataIndex] = useState(3);
    const [dataLabel, setDataLabel] = useState("Infection Count");
    const [barColor, setBarColor] = useState("rgba(255, 99, 132, 0.5)")
    const [covidData, setCovidData] = useState([]);
    const [duration, setDuration] = useState('');
    const [countryList, setCountryList] = useState([]);
    const { dispatch } = useAuth();
    const history = useHistory();

    useEffect(() => {
        dataReader().then((response) => setCovidData(response));
        countryDataReader().then((response) => setCountryList(response));
    },[])

    const countryDataList = countryList? countryList?.data?.filter((datum) => !(datum[0].startsWith("iso") || datum[0].startsWith("OWID")))
        .map((datum) => {
            return {
                value: datum[0],
                label: datum[1]
            }
        }): [];
    const countryData = covidData?.data?.filter((datum)=> datum[0]===country)
    const label = duration ? countryData?.map((datum) => datum[2]).slice(countryData.length - duration, countryData.length)
                        : countryData?.map((datum) => datum[2]);

    const onLogout = () => {
        logout(dispatch, () => {
            history.push(`/auth`);
        });
    };

    const getViewedData = () => {
        const data =  countryData?.map((datum) => datum[dataIndex]);
        if(!duration) return data;
        return data.slice(countryData.length - duration, countryData.length)
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
            <div className={`mx-auto w-2/3 mt-16 `}>
                <div className={`flex flex-row justify-end  text-xl`}>
                    <Button onClick={onLogout}>Log Out</Button>
                </div>
                <div className={`flex flex-row justify-end gap-2`}>
                    <div className={`mt-2.5`}>
                        <Chip onClick={(_) => {
                            setDataIndex(3);
                            setDataLabel("Infection Count");
                            setBarColor("rgba(255, 99, 132, 0.5)")
                        }} label="Infection" clickable={true} variant={"outlined"} />
                    </div>
                    <div className={`mt-2.5`}>
                        <Chip onClick={(_) => {
                            setDataIndex(4);
                            setDataLabel("Death Count");
                            setBarColor("rgba(0, 0, 0, 0.6)")
                        }} label="Death" clickable={true} variant={"outlined"}/>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-disabled-label">Country</InputLabel>
                            <Select
                                value={country}
                                label="Country"
                                onChange={handleChange}
                            >
                                {countryDataList && countryDataList.map((datum) => {
                                    return (
                                        <MenuItem key={datum.value} value={datum.value}>{datum.label}</MenuItem>
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
            </div>
            <div className={`w-2/3 mx-auto mt-5 `}>
            <Bar options={options} data={barChartData} type={"bar"}/>
            </div>
        </div>
    )
}