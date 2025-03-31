const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

let emails = new Set() // make a set so that the emails cannot be duplicated 

let drivers = [
  { id: 1, name: "Lewis Hamilton", email: "hamilton@hp.com", wins: 105, team: "HP Scuderia Ferrari" },
  { id: 2, name: "Fernando Alonso", email: "fernando@aramco.com", wins: 32, team: "Aramco Aston Martin Racing" },
  { id: 3, name: "Kimi Antonelli", email: "antonelli@petronas.com", wins: 0, team: "Petronas AMG Mercedes" },
  { id: 4, name: "Max Verstappen", email: "verstappen@oracle.com", wins: 65, team: "Oracle Red Bull Racing" }
]

// add our initial emails to the set so no duplicate emails
drivers.forEach(driver => emails.add(driver.email))

// get all our drivers
app.get('/drivers', (req, res) => {
  res.json(drivers)
})

// for adding a new driver
app.post('/drivers', (req, res) => {
  const { name, team, email, wins } = req.body

  // check if all fields have entered values 
  if (!name || !team || !email || wins == undefined) {
    return res.status(400).json({ error: 'All fields (name, team, email, wins) are required.' })
  } if (emails.has(email)) {
    // If the email already exists give an error that it exists already
    return res.status(400).json({ error: 'Email already exists.' })
  }

  const newDriver = {
    id: Math.floor(Math.random() * 1000), // use random and  so no duplicate ids  
    name,
    team,
    email,
    wins: parseInt(wins) // this enforces that our wins field is an int 
    }
  drivers.push(newDriver)
  emails.add(email)

  res.status(201).json(newDriver)
})

// edit an existing driver
app.put('/drivers/:id', (req, res) => {
  const { id } = req.params
  const driverId = parseInt(id)
  const { name, email, wins, team } = req.body

  const index = drivers.findIndex(driver => driver.id === driverId)
  if (index === -1) {
    return res.status(404).json({ error: 'Driver not found.' })
  }

  // update our drivers details
  // take the drivers and go to the index of edited driver and updating those fields 
  drivers[index] = { ...drivers[index], name, email, wins, team}
  res.json(drivers[index])
})

// delete a driver
app.delete('/drivers/:id', (req, res) => {
  const { id } = req.params
  const driverId = parseInt(id) // convert string id to number, was running nito error where driver was not found

  const index = drivers.findIndex(driver => driver.id === driverId)
  if (index === -1) {
    return res.status(404).json({ error: 'Driver not found.' })
  }

  emails.delete(drivers[index].email) // remove email from tracking so deleted emails can be re-entered
  drivers.splice(index, 1)

  res.json({ message: 'Driver deleted successfully.' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
