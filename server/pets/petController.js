var Pet = require('./petModel.js');
var Q = require('q');

module.exports = {
    addPet: function(req, res){
        var newPet = new Pet({
            name: req.body.name,
            vetName: req.body.vetName,
            vetAddress: req.body.vetAddress,
            vetPhone: req.body.vetPhone,
            allergies: req.body.allergies,
            medications: req.body.medications,
            microchip: req.body.microchip,
            notes: req.body.notes,
            ownerPhone: req.body.ownerPhone,
            ownerId: req.body.ownerId
        })
        
    },

    getPet: function(req, res){

    },

    editPet: function(req, res){

    },

    deletePet: function(req, res){
        
    }
};