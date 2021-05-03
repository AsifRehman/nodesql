const express = require('express');

function eRoutes() {
    const router = express.Router();
    var employee = require('./repository/employee/employee.routes')(router);
    var department = require('./repository/department/department.routes')(router);
    var party = require('./repository/party/party.routes')(router);
    var ledger = require('./repository/ledger/ledger.routes')(router);
    var mhead = require('./repository/mhead/mhead.routes')(router);
    return router;
}

module.exports = eRoutes;