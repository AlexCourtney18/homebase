const User = require('./User');
const Bill = require('./Bill');
const Group = require('./Group');
const Chore = require('./Chore');
const Grocery = require('./Grocery');


Group.hasMany(User, {
    foreignKey: 'group_id'
});

User.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Bill, {
    foreignKey: 'group_id'
});

Bill.belongsTo(Group, {
    foreignKey: 'group_id'
});

// Bill.belongsToMany(User {
//     through: Group,
//     as: 'split_bill',
//     foreignKey: 
// })

module.exports = { User, Bill, Group, Chore, Grocery };

