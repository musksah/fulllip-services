module.exports = (sequelize, type) => {
    const UserP = sequelize.define('user_permission', {
        id_user_permission: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_permission: {
            type: type.BIGINT,
            references: {
                model: 'permission',
                key: 'id_permission'
            }
        },
        id_user: {
            type: type.BIGINT,
            references: {
                model: 'user',
                key: 'id_user'
            }
        }
    }, {
        tableName: 'user_permission'
    }
    );
    return UserP;
}