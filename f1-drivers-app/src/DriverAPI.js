// From GitHub ColorList3 routing repo
const apiURL = 'http://localhost:5000'

export default class DriverAPI {

    static fetchDrivers() {
        return fetch(`${apiURL}/drivers`).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to fetch drivers')
                }
            })
    }

    static addDriver(driver) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driver)
        }

        return fetch(`${apiURL}/drivers`, options).then(async response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to add driver')
                }
            })
    }

    static modifyDriver(driver) {
        if (!driver.id) {
            throw new Error("Driver must have an ID to update.")
        }

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driver)
        }

        return fetch(`${apiURL}/drivers/${driver.id}`, options).then(async response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to update driver')
                }
            })
    }

    static deleteDriver(driverId) {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return fetch(`${apiURL}/drivers/${driverId}`, options).then(async response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Failed to delete driver')
                }
            })
    }
}