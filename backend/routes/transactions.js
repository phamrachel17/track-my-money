const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello Transactions')
})

module.exports = router