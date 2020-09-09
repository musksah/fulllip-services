module.exports = (sequelize, type) => {
    const Permission = sequelize.define('permission', {
        id_permission: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        codename: type.STRING
    }, {
        tableName: 'permission'
    });
    return Permission;
}