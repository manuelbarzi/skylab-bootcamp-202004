const { API_URL } = require("../../config")
const axios = require("axios")

module.exports = (latitude, longitude) => {
    return axios.get(`${API_URL}/restaurants`, {
            params: {
                latitude,
                longitude
            }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return data.restaurant
            } else {
                throw new Error(data.error)
            }
        })
        .catch(console.log)
}