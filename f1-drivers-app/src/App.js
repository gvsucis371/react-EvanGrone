// https://legacy.reactjs.org/docs/introducing-jsx.html
// https://www.geeksforgeeks.org/how-to-do-crud-operations-in-reactjs/
// https://medium.com/@bhairabpatra.iitd/crud-create-read-update-delete-application-in-react-566bf229aaee
// https://ngrok.com/blog-post/react-crud-example
// https://www.dhiwise.com/post/step-by-step-guide-to-building-your-first-react-crud-app

import React, { useState } from 'react';
import './index.css'

const drivers_list = [
    {id: 1, name: "Lewis Hamilton", email: "hamilton@hp.com", wins: 105, team: "HP Scuderia Ferrari"},
    {id: 2, name: "Fernando Alonso", email: "fernando@aramco.com", wins: 32, team: "Aramco Aston Martin Racing"},
    {id: 3, name: "Kimi Antonelli", email: "antonelli@petronas.com", wins: 0, team: "Petronas AMG Mercedes"},
    {id: 4, name: "Max Verstappen", email: "verstappen@oracle.com", wins: 57, team: "Oracle Red Bull Racing"},
];

function Driver({ driver, Delete, Edit }) {
  return (
      <li className='driver-box'>
          <h3>{driver.name}</h3>
          <p>Email: {driver.email}</p>
          <p>Wins: {driver.wins}</p>
          <p>Team: {driver.team}</p>
          <button onClick={() => Edit(driver)}>Edit Driver Details</button>
          <button onClick={() => Delete(driver.id)}>Delete Driver</button>
      </li>
  );
}

function App() {
  const [drivers, setDrivers] = useState(drivers_list);
  const [form, setForm] = useState({id: null, name: '', email: '', wins: '', team: ''});

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.id) {
      // Update existing driver
      setDrivers(drivers.map(d => (d.id === form.id ? { ...form, wins: parseInt(form.wins) } : d)));
    } else {
      // Create new driver with an auto-incrementing id
      setDrivers([...drivers, { ...form, id: drivers.length + 1, wins: parseInt(form.wins) }]);
    }
    // Reset form after submit
    setForm({ id: null, name: '', email: '', wins: '', team: '' });
  };

  const handleDelete = (id) => {
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
                    placeholder='Driver email'
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
                <button type="submit">{form.id ? 'Update' : 'Add'} Driver</button>
            </form>
        </div>

        <ul className='driver-list'>
            {drivers.map(driver => (
                <Driver
                    key={driver.id}
                    driver={driver}
                    Delete={handleDelete}
                    Edit={handleEdit}
                />
            ))}
        </ul>
    </div>
  );
}

export default App;