const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        //Ler o total de incidentes
        const [count] = await connection('incidents').count();

        console.log(count);

        // Paginação de 5 incidentes por página
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },



    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert ({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        // Verificar se o id da ong corresponde ao id da ong que criou a postagem
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation not permitted '}) //Não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

};