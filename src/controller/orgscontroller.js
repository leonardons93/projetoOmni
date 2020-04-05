const crypto = require('crypto')
const connection = require('../databases/connection.js')

module.exports = { async create  (req, res)  {
    const { nome, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(6).toString('HEX');

    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        city,
        uf
    })
    return res.json({ id })
},
async list(req, res) {
    const ong = await connection('ongs').select('*');
    return res.json(ong)
}

} 