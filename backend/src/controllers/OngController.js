const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //Listagem das ONGs
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    // Cadastrar uma nova ONG
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); // Gerar um id para cada ONG

        await connection('ongs').insert({
                id,  
                name,
                email,
                whatsapp,
                city,
                uf,  
        })


        return response.json({ id });
    }
}