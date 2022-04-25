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
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map((datum, index) => index*2),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};
function handleClick() {

}

export default  function CovidData({}) {
    const [age, setAge] = useState('10');
    const [sex, setSex] = useState('');
    // const [barChartData, setBarChartData] = useState({})
    const [covidData, setCovidData] = useState([]);

    useEffect(() => {
        dataReader().then((response) => setCovidData(response));
    },[])
    const countryData = covidData?.data?.filter((datum)=> datum[0]==='AFG')
    const label = countryData?.map((datum) => datum[2]);
    const infectionCount = countryData?.map((datum) => datum[3]);
    const deathCount = countryData?.map((datum) => datum[4]);

    const barChartData = {
        labels: label,
        datasets: [
            {
                label: 'Infection Count',
                data: infectionCount,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }

    console.log(barChartData)

    const handleChange = (event) => {
        setAge(String(event.target.value));
    };
    return (
        <div>
            <Card className={`mx-auto w-2/3 mt-16 `}>
                <div className={`flex flex-row justify-end`}>
                    <div className={`mt-2.5`}>
                        <Chip label="Chip Filled" />
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-disabled-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-disabled-label"
                                id="demo-simple-select-disabled"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel >Sex</InputLabel>
                            <Select
                                labelId="demo-simple-select-disabled-label"
                                id="demo-simple-select-disabled"
                                value={sex}
                                label="Sex"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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