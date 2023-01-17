const bcrypt = require('bcrypt')
const saltRounds = 10

// Hashing received password
const hashPassword = async(password) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        return null
    }
}

// match input password vs database
const hashMatch = async(loginPassword, databasePassword) => {
    try {
        let match = await bcrypt.compare(loginPassword, databasePassword)
        return match
    } catch (error) {
        return false
    }
}

module.exports = {
    hashMatch, hashPassword
}