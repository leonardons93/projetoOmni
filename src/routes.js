const express = require('express')
const routes = express.Router()
const ongController = require('./controller/orgscontroller.js')
const casos = require('./controller/casos.js')
const login = require('./controller/sessaocontroller.js')
routes.get('/ongs', ongController.list)
routes.get('/casos', casos.list)
routes.delete('/casos/:id', casos.delete)
routes.post('/login', login.create)
routes.get('/casoslist', casos.listcasos)
routes.post('/casos', casos.create)
routes.post('/ongs', ongController.create)



routes.get('/', (req, res) => {
    return res.json({
        evento: "semana omnistack",
        Aluno: "leonardo"
    })
})
module.exports = routes;