const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { spaceId }, body } = req

    try {
        logic.updateSpace(spaceId, body)
            .then(() => res.json({ message: 'space updated successfully'}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}

