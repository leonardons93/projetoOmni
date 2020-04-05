const crypto = require('crypto')
const connection = require('../databases/connection.js')

module.exports = {
    async create(req, res){
        const {id} = req.body;

        const ong = await connection('ongs')
        .where('id',id)
        .select('nome')
        .first()
        if(!ong){
            return res.status(400).json({error:'no ong found with this id'})
        }
         return res.json(ong);
    }
}