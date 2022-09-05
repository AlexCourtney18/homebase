const User = require('./User');
const Bill = require('./Bill');
const Group = require('./Group');
const Chore = require('./Chore');
const Grocery = require('./Grocery');
const Tenant = require('./Tenant');

Group.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Group, {
    foreignKey: 'user_id'
});

Group.belongsToMany(User, {
    through: Tenant,
    as: 'joined_group',
    foreignKey: 'group_id'
});

Bill.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Bill, {
    foreignKey: 'group_id'
});

Chore.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Chore, {
    foreignKey: 'group_id'
});

Grocery.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Grocery, {
    foreignKey: 'group_id'
});

module.exports = { User, Bill, Group, Chore, Grocery };

