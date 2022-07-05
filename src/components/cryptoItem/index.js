import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LineChart from '../lineChart/lineChart';
import Table from '../table';

import './cryptoItem.scss';

function CryptoItem() {
    const location = useLocation();
    const { state } = location;

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    useEffect(() => {
        fetch(`https:api.coincap.io/v2/assets/${state.id}/history?interval=d1`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(json => json.json()).then(data => setChartData({
            ...chartData,
            labels: data.data.map(it => `${new Date(it.date).getDate()}/${new Date(it.date).getMonth()}/${new Date(it.date).getFullYear()}`),
            datasets: [{ ...chartData.datasets[0], label: state.symbol, data: data.data.map(it => it.priceUsd) }]
        }));
    }, [state.id])

    return (
        <div className="crypto-item">
            <Table crypto={[state]} />
            <div style={{ width: '80%', margin: '0 10%' }}>
                <LineChart chartData={chartData} />
            </div>
        </div>
    )
}
export default CryptoItem;