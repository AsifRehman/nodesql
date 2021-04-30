var response = require('../../shared/response');

var TYPES = require('tedious').TYPES;

function DepartmentRepository(dbContext) {
    function getDepartments(req, res) {
        var params = [];

        dbContext.getQuery("select * from [in-depart]", params, false, function (error, data) {
            
            return res.json(response(data, error));
        });
    }

    return { getDepartments };
}

module.exports = DepartmentRepository;