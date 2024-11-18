const sequelize = require("../dbAdmin");
const { DataTypes } = require('sequelize');



const Event = sequelize.define("event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
});

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    date: { type: DataTypes.DATE, allowNull: false }
});

const UserEvent = sequelize.define("userEvent", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' }},
    eventId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Event, key: 'id' }}
});

// Define many-to-many relationship
User.belongsToMany(Event, { through: "UserEvent" });
Event.belongsToMany(User, { through: "UserEvent" });

module.exports = {
    Event,
    User,
    UserEvent
};
