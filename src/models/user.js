module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id_user: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
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