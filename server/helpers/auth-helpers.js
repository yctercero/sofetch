var bcrypt   = require('bcrypt-nodejs');

module.exports = {
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: function(password, attempt) {
        return bcrypt.compareSync(password, attempt);
    }
};