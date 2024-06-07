function model(Sequelize, connection) {
    const Board = connection.define("board", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.TEXT
        },
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        writer: {
            type: Sequelize.STRING
        },
        writeDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    const User = connection.define("user", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    const Event = connection.define("event", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'no'
            }
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    connection.sync({
        alter: true
    })
}

module.exports = model;
