function model(Sequelize, connection) {
    connection.define("board", {
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
    })

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

    // 이벤트 모델 정의
    const Event = connection.define("event", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
        },
        title: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User, // 'users' 테이블을 참조
                key: 'no' // 'id' 대신 'no'를 참조
            }
        }
    });


    connection.sync({
        alter: true
    })
}

module.exports = model;