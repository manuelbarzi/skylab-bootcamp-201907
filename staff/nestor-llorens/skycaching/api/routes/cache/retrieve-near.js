const logic = require('../../logic/cache')

async function retrieveNear (req, res) {
    
    const { userId, params: { distance } } = req
    
    try {
        const caches = await logic.retrieveNear(userId, distance)
        res.json({ message: 'near caches retrieved correctly', caches })

    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}

module.exports = retrieveNear