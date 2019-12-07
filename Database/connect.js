var Connection = require('tedious').Connection;

var config = {
    server: '192.169.82.62',
    authentication: {
        type: 'default',
        options: {
            userName: 'cosoft',
            password: 'Abc007302420'
        }
    },
    options: {
        database: 'ACCOUNT',
//        instanceName: 'Sqlexpress',
        rowCollectionOnDone: true,
        useColumnNames: false
    }
}

var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

module.exports = connection;
