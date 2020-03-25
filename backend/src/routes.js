const express = require('express');

// importar controladores
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController')


const routes = express.Router();

routes.post('/session', SessionController.create)

//Listar ONGs cadastradas
routes.get('/ongs', OngController.index);
//Cadastrar nova ong
routes.post('/ongs', OngController.create);

//Listar o perfil de uma ONG
routes.get('/profile', ProfileController.index);

//Listar as postagens de incidentes criadas 
routes.get('/incidents', IncidentController.index);
//Cadastrar novas postagens de incidentes
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
