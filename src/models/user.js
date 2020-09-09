module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id_user: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            unique: true
        },
        email: type.STRING,
        password: type.STRING,
        is_active: {
            type: type.INTEGER,
            defaultValue: 1,
        },
        id_rol: {
            type: type.BIGINT,
            defaultValue: 1,
            references: {
                model: 'rol',
                key: 'id_rol'
            }
        }
    }, {
        tableName: 'user'
    });
    return User;
}