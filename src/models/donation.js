module.exports = (sequelize, type) => {
    const Donation = sequelize.define('donation', {
        id_donation: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        total: type.STRING,
    }, {
        tableName: 'donation'
    });
    return Donation;
}