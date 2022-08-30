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

Chore.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Chore, {
    foreignKey: 'user_id'
});

//For the grocerys, the Grocery(item) itself could be associated with individual users,
//for now I have it written to just be associated with a group, as in a group can have a list
//with many grocery that can be interacted with. This can be changed so that a grocery also
//belongs to a single user, or another association can be added.
Grocery.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Grocery, {
    foreignKey: 'group_id'
});

//these many to many associations are probably going to need some help. I anticipate there
//needing to be some kind of change with the foreign keys. Once the server is running
//and some basic routes are created I will run more testing and get the accociations nailed
//down.
Bill.belongsToMany(User, {
    through: Group,
    as: 'split_bill',
    foreignKey: 'group_id'
});

User.belongsToMany(Bill, {
    through: Group,
    as: 'split-bill',
    foreignKey: 'user_id'
});

module.exports = { User, Bill, Group, Chore, Grocery };
