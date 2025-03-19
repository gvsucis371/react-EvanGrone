// https://legacy.reactjs.org/docs/introducing-jsx.html

import React from 'react';

const drivers_list = [
    {name: "Lewis Hamilton", wins: 105, team: "Scuderia Ferrari"},
    {name: "Fernando Alonso", wins: 32, team: "Aramco Aston Martin Racing"},
    {name: "Kimi Antonelli", wins: 0, team: "Mercedes"},
    {name: "Max Verstappen", wins: 57, team: "Oracle Red Bull Racing"},
]

function Driver(props) {
  return (
      <li>
          <h3>{props.name}</h3>
          <p>Wins: {props.wins}</p>
          <p>Team: {props.team}</p>
      </li>
  );
}

function Display(props) {
  return (
      <div> 
          <h1>Formula 1 Drivers</h1>
          <ul>
              {props.drivers.map((driver, index) => (
                  <Driver 
                      key={index}
                      name={driver.name}
                      wins={driver.wins}
                      team={driver.team}
                  />
              ))}
          </ul>
      </div>
  );
}

function App() {
  return (
      <Display drivers={drivers_list} /> // pass drivers list as a prop to display 
  );
}

export default App;