module.exports = (sequelize, type) => {
    const Video = sequelize.define('video', {
        id_video: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            defaultValue: '',
            allowNull: false
        },
        url: {
            type: type.TEXT,
            defaultValue: '',
            allowNull: false
        },
        description: {
            type: type.TEXT,
            defaultValue: '',
            allowNull: false
        },

    }, {
        tableName: 'video'
    });
    return Video;
}