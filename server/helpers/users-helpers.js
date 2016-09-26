const session = require('../config.js');

module.exports = {
    findByUsernamePassword: function(username, password, cb){
        session
            .run(`MATCH (n:User ) WHERE n.username = "${username}" RETURN n`)
            .then(function(result){
                console.log("RESULT", result, result.records.length)
                if(result.records.length){
                    console.log("USER ALREADY EXISTS")
                    return cb(null, result)
                }else{
                    console.log("IM HERE1", cb);
                    return cb(false, false);
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