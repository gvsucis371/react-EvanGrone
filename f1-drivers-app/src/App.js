// https://www.w3schools.com/react/react_forms.asp
// https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
// https://www.geeksforgeeks.org/how-to-do-crud-operations-in-reactjs/
// Code from ColorList3_routing Sample code in Github was basis for parts of code for part 3 API HW

import React, { useState, useEffect } from 'react'
import './index.css'
import DriverAPI from './DriverAPI'

// Default empty driver for form
const defaultDriver = { id: null, name: '', email: '', wins: '', team: '' }

function Driver(props) {
    return (
        <li className='driver-box'>
            <h3>{props.driver.name}</h3>
            <p>Email: {props.driver.email}</p>
            <p>Wins: {props.driver.wins}</p>
            <p>Team: {props.driver.team}</p>
            <button onClick={() => props.onEditDriver(props.driver)}>Edit Driver Details</button>
            <button onClick={() => props.onDeleteDriver(props.driver.id)}>Delete Driver</button>
        </li>
    )
}

function App() {
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(undefined)
    const [editMode, setEditMode] = useState(false)
    const [driverToEdit, setDriverToEdit] = useState(defaultDriver)

    let fetchDrivers = () => {
        setLoading(true)
        console.log('Fetching drivers')
        // fetchColors returns a promise (hence the ability to still
        // use then and catch below.)
        DriverAPI.fetchDrivers()
            .then(data => {
                setMessage(undefined)
                setDrivers(data)
                setLoading(false)
            }).catch(problem => {
                setLoading(false)
                setMessage(`Unable to load drivers from the server: ${problem}`)
            })
    }

    // The [] below is important, otherwise, 
    // we end up making an API call on every update.
    useEffect(fetchDrivers, [])

    const finishSubmit = (newDrivers) => {
        setDrivers(newDrivers)
        setEditMode(false)
        setDriverToEdit(defaultDriver)
    }

    const submit = (event) => {
        event.preventDefault()
        // Check for duplicate emails, Changed check to be server side 
        // if (drivers.some(d => d.email === driverToEdit.email && d.id !== driverToEdit.id)) {
        //     setMessage("Email already exists. Please use a unique email address.")
        //     return
        // }
        if (editMode) {
            console.log('In edit mode.')
            DriverAPI.modifyDriver(driverToEdit).then(data => {
                    console.log('Received from modify driver post')
                    console.log(data)
                    const newDrivers = drivers.map(item => item.id === driverToEdit.id ? driverToEdit : item)
                    finishSubmit(newDrivers)
                })
            } else {
                console.log('In new driver mode.')
                DriverAPI.addDriver(driverToEdit).then(data => {
                        console.log('Received from new driver post')
                        console.log(data)
                        const newDriver = { ...driverToEdit, id: data.id }
                        // Remember, use a completely new object
                        // when updating state.
                        const newDrivers = [...drivers, newDriver]
                        finishSubmit(newDrivers)
                    })
                    .catch(error => {
                        console.log('Problem saving new driver')
                        console.log(error)
                        setMessage(`Error adding driver: ${error.message}`)
                    })
        }
    }

    const updateFormData = (driver) => {
        setDriverToEdit(driver)
    }

    const editDriver = (driver) => {
        setDriverToEdit(driver)
        setEditMode(true)
    }

    const cancelEdit = () => {
        setDriverToEdit(defaultDriver)
        setEditMode(false)
    }

    const handleDelete = (id) => {
        DriverAPI.deleteDriver(id).then(() => {
                const newDrivers = drivers.filter(driver => driver.id !== id)
                setDrivers(newDrivers)
            }).catch(error => {
                console.log('Problem deleting driver')
                console.log(error)
                setMessage(`Error deleting driver: ${error.message}`)
            })
    }

    return (
        <div className='page-container'>
            <h1>Formula 1 Drivers</h1>
            <div className='form'>
                <h2>{editMode ? 'Edit' : 'Add'} Driver</h2>
                <form onSubmit={submit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Driver Name'
                        value={driverToEdit.name}
                        onChange={(event) => updateFormData({ ...driverToEdit, name: event.target.value })}
                        required
                    />
                    <input
                        type='text'
                        name='email'
                        placeholder='Driver Email'
                        value={driverToEdit.email}
                        onChange={(event) => updateFormData({ ...driverToEdit, email: event.target.value })}
                        required
                    />
                    <input
                        type='number'
                        name='wins'
                        placeholder='Driver Wins'
                        value={driverToEdit.wins}
                        onChange={(event) => updateFormData({ ...driverToEdit, wins: parseInt(event.target.value) || 0 })}
                        required
                    />
                    <input
                        type='text'
                        name='team'
                        placeholder='Driver Team'
                        value={driverToEdit.team}
                        onChange={(event) => updateFormData({ ...driverToEdit, team: event.target.value })}
                        required
                    />
                    <button type="submit">{editMode ? 'Update' : 'Add'} Driver</button>
                    <button type="button" onClick={cancelEdit}>Cancel</button>
                </form>
            </div>

            {loading ? (
                <div>Loading drivers...</div>
            ) : (
                <ul className='driver-list'>
                    {drivers.length === 0 ? (
                        <div>No drivers found. Add a driver to get started.</div>
                    ) : (
                        drivers.map(driver => (
                            <Driver 
                                key={driver.id} 
                                driver={driver} 
                                onDeleteDriver={handleDelete} 
                                onEditDriver={editDriver} 
                            />
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}

export default App