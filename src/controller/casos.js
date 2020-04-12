const crypto = require('crypto')
const connection = require('../databases/connection.js')

module.exports = {
    async create(req, res) {
        const { titulo, descricao, valor } = req.body;
        const ong_id = req.headers.authorization; //serve para ver qual ongs esta autenticada pois ai vem o dado da requisição
        const [id] = await connection('casos23').insert({
             titulo,
             descricao,
             valor,
             ong_id

         });
        
      return res.json({ id })

        },

async list(req, res) {
    const { page = 1} = req.query;
    const [count] = await connection('casos23').count();
    const casoslist = await connection('casos23').join('ongs', 'ongs.id', '=','casos23.ong_id')
    .limit(5).offset((page-1)*5)
    .select('casos23.*','ongs.nome','ongs.email','ongs.whatsapp','ongs.city','ongs.uf');
    res.header('total-de-casos', count['count(*)'])
    return res.json(casoslist)
    },

async delete(req, res) {

    const { id } = req.params;
    const ong_id = req.headers.authorization;
    const incidents = await connection('casos23')
    .where('id',id)
    .select('ong_id')
    .first();
    if (incidents.ong_id !== ong_id ){
        return res.status(401).json({erro: 'Operation nao permitted'});
    }
    await connection('casos23').where('id', id).delete();
    return res.status(204).send();

} ,

async listcasos(req, res) {

        const ong_id = req.headers.authorization;
        const incidents = await connection('casos23')
            .where('ong_id', ong_id)
            .select('*')

    return res.json(incidents)
    } 





}