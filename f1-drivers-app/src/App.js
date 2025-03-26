// https://www.w3schools.com/react/react_forms.asp
// https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
// https://www.geeksforgeeks.org/how-to-do-crud-operations-in-reactjs/


import React, { useState } from 'react';
import './index.css';

const drivers_list = [
    { id: 1, name: "Lewis Hamilton", email: "hamilton@hp.com", wins: 105, team: "HP Scuderia Ferrari" },
    { id: 2, name: "Fernando Alonso", email: "fernando@aramco.com", wins: 32, team: "Aramco Aston Martin Racing" },
    { id: 3, name: "Kimi Antonelli", email: "antonelli@petronas.com", wins: 0, team: "Petronas AMG Mercedes" },
    { id: 4, name: "Max Verstappen", email: "verstappen@oracle.com", wins: 65, team: "Oracle Red Bull Racing" },
];

function Driver(props) {
    return (
        <li className='driver-box'>
            <h3>{props.driver.name}</h3>
            <p>Email: {props.driver.email}</p>
            <p>Wins: {props.driver.wins}</p>
            <p>Team: {props.driver.team}</p>
            <button onClick={() => props.Edit(props.driver)}>Edit Driver Details</button>
            <button onClick={() => props.Delete(props.driver.id)}>Delete Driver</button>
        </li>
    );
}

function App() {
    const [drivers, setDrivers] = useState(drivers_list);
    const [form, setForm] = useState({ id: null, name: '', email: '', wins: '', team: '' });

    const handleChange = (event) => {
        // handles changes from input
        // event.target.name is changed field, so email, name, wins, and updates it after taking existing form 
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.id) {
            // Update existing driverss, loops thorugh the drivers with map
            // take existing form and checks if id matches the driver we are editing, if not then the driver remains the same 
            setDrivers(drivers.map(d => (d.id === form.id ? { ...form} : d)));
        } else {
            // Create new driver with new id
            setDrivers([...drivers, { ...form, id: drivers_list.length + 1}]);
        }
        setForm({ id: null, name: '', email: '', wins: '', team: '' });
    };

    const handleDelete = (id) => {
        // delete the driver filters out drivers that don't match the id we want to delete, setting the state to the filtered list
        setDrivers(drivers.filter(driver => driver.id !== id));
    };

    const handleEdit = (driver) => {
        setForm(driver);
    };

    return (
        <div className='page-container'>
            <h1>Formula 1 Drivers</h1>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Driver Name'
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='email'
                        placeholder='Driver Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='number'
                        name='wins'
                        placeholder='Driver Wins'
                        value={form.wins}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='team'
                        placeholder='Driver Team'
                        value={form.team}
                        onChange={handleChange}
                        required
                    />
                    {/* On submit check if we are updating a driver or adding one */}
                    <button type="submit">{form.id ? 'Update' : 'Add'} Driver</button>
                </form>
            </div>

            <ul className='driver-list'>
                {/* Rendering the list of drivers */}
                {drivers.map(driver => (
                    <Driver key={driver.id} driver={driver} Delete={handleDelete} Edit={handleEdit} />
                ))}
            </ul>
        </div>
    );
}

export default App;