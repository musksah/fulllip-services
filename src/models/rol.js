module.exports = (sequelize, type) => {
    const Rol = sequelize.define('rol', {
        id_rol: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        permission_list: type.TEXT
    }, {
        tableName: 'rol'
    });
    return Rol;
}