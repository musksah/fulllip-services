module.exports = (sequelize, type) => {
    const Settings = sequelize.define('settings', {
        id_settings: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        activated: type.INTEGER
    }, {
        tableName: 'settings'
    });
    return Settings;
}