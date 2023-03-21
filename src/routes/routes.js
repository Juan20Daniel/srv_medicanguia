const express = require('express');
const Route = express.Router();
const createUsers = require('../controllers/createUsers');
const initSesion = require('../controllers/initSession');
const getUser = require('../controllers/getUser');
const { moveImage, createPublication } = require('../controllers/createPublication');
const getPublications = require('../controllers/getPublications');
const getPublicationsSaves = require('../controllers/getPublicationsSaves');
const savePublication = require('../controllers/savePublication');
const updateUser = require('../controllers/updateUser');
const addComent = require('../controllers/addComment');
const getComments = require('../controllers/getComments');

Route.post('/init-session', initSesion);
Route.post('/create-users', createUsers);
Route.get('/get-user/:idUser', getUser);
Route.post('/create-publication', moveImage, createPublication);
Route.get('/get-publications', getPublications);
Route.get('/get-publications-saves/:idUser', getPublicationsSaves);
Route.post('/save-publication', savePublication);
Route.post('/update-user', updateUser);
Route.post('/add-comment', addComent);
Route.get('/get-comments/:idComment', getComments);

module.exports = Route;