const User = require('./User');
const Bill = require('./Bill');

User.hasMany(Bill, {
    foreignKey: 'user_id'
});

Bill.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Bill };