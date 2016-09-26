const session = require('../config.js');

module.exports = {
    findByUsername: function(username, cb){
        session
            .run(`MATCH (n:User ) WHERE n.username = "${username}" RETURN n`)
            .then(function(result){
                console.log("RESULT", result, result.records.length)
                if(result.records.length){
                    console.log("USER ALREADY EXISTS")
                    return cb(null, result)
                }else{
                    return cb(null, null);
                }
                
            })
            .catch(function(err){
                console.log("ERRrrr", err)
                return cb(null, null)
            });
    },

    findById: function(id, cb){
        session
            .run(`MATCH (n:User ) WHERE ID(n) = ${id} RETURN n`)
            .then(function(result){
                fn(null, result);
            })
            .catch(function(err){
                fn(new Error(`User ${id} does not exist`));
            });
    }
};