// https://legacy.reactjs.org/docs/introducing-jsx.html

import React from 'react';

const drivers = [
    {name: "Lewis Hamilton", wins: 105, team: "Scuderia Ferrari"},
    {name: "Fernando Alonso", wins: 32, team: "Aramco Aston Martin Racing"},
    {name: "Kimi Antonelli", wins: 0, team: "Mercedes"},
    {name: "Max Verstappen", wins: 57, team: "Oracle Red Bull Racing"},
]

function Driver(props) {
    return (
    <li>
        <h2>{props.name}</h2>
        <p>Wins: {props.wins}</p>
        <p>Team: {props.team}</p>
    </li>
    );
}

function DriversDisplay(props) {
return (
    <div> 
    <h1>Formula 1 Drivers</h1>
    <ul>
        {props.drivers.map((driver, index) => (
            <li key={index}>
                <h2>{driver.name}</h2>
                <p>Wins: {driver.wins}</p>
                <p>Team: {driver.team}</p>
            </li>
        ))}
    </ul>
</div>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(DriversDisplay);