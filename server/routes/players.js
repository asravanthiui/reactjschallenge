const express = require('express');
const router = express.Router();

const models = require('../models');
const Player = models.Player;
const Location = models.Location;

const messages = require('../config/locals');

/**
/* @@ HTTP-Method - Get
/* @@ description - Get all players using /players endpoint
*/
router.get('/', function(req, res, next) {
  Player.findAll({include: {model: Location, as: 'locations'}}).then(players => {
    res.json(players);
  })  
});

/**
/* @@ HTTP-Method - Get
/* @@ description - Get single player
*/
router.get('/:id', function(req, res, next) {
  console.log(req.params.id, '????!!!!!');
  Player.findOne({where: {id: req.params.id},include: {model: Location, as: 'locations'}}).then(player => {
    res.json(player);
  })  
});

/**
/* @@ HTTP-Method - Post
/* @@ Request Body - Consists of single file
/* @@ description - Get all players using /players endpoint
*/
router.post('/', function(req, res, next) {
  const file = req.files.file;
  const playersJSON = JSON.parse(file.data.toString('utf-8'));
  const players = playersJSON['Players'];
  let promises = [];

  players.forEach(it => {
     promises.push(Player.create(it, {
      include: [
          { model: Location, as: 'locations' }
      ]}))
  })

  Promise.all(promises).then(() =>{
    res.json({status: messages.players.apiSuccessMessage});
  }).catch(err => {
    res.status(500).send({ error:  messages.players.apiFailureMessage});
  })
})

/**
/* @@ HTTP-Method - Delete
/* @@ description - Delete single player
*/
router.delete('/:id', function(req, res, next) {
  Player.softDelete({where: {id: req.params.id}}).then(player => {
    res.json(player);
  })  
});

module.exports = router;
