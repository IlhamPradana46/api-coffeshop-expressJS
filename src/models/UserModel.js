module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id : {
            primaryKey : true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        username : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        }
    })

    return User;
}