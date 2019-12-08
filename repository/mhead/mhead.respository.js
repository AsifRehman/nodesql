
var response = require('../../shared/response');
var TYPES = require('tedious').TYPES;

function MHeadRepository(dbContext) {

    function findMHead(req, res, next) {

        if (req.params.mheadId) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.params.mheadId });

            var query = "select * from tbl_MHead where MheadId = @Id"

            dbContext.getQuery(query, parameters, false, function (error, data) {
                if (data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        }
    }

    function getMHeads(req, res) {
        var parameters = [];

        if (req.query.salary) {

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.query.salary });

            var query = "select * from tbl_MHead where salary>=@Id"

            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }
        else {
            parameters.push({ name: 'Id', type: TYPES.Int, val: req.query.salary });

            dbContext.getQuery("SELECT * FROM tbl_MHead where mheadID>=@Id", parameters, false,  function (error, data) {
                return res.json(response(data, error));
//            dbContext.get("getMHeads", function (error, data) {
//                return res.json(response(data, error));
            });
        }
    }

    function getMhead(req, res) {
        return res.json(req.data);
    }

    function postMHeads(req, res) {

        var parameters = [];

        parameters.push({ name: 'MHeadID', type: TYPES.Int, val: req.body.MHeadID });
        parameters.push({ name: 'MHead', type: TYPES.VarChar, val: req.body.MHead });

        // Object.entries(employee).forEach((property)=>{
        //     parameters.push({name:'@'+property[0]})
        // });

        dbContext.post("insertMHead", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function putMHead(req, res) {

        var parameters = [];

        Object.entries(req.data).forEach((property) => {

            if (req.body[property[0]]) {
                parameters.push(
                    {
                        name: property[0],
                        val: req.body[property[0]],
                        type: TYPES.VarChar
                    });
            } else {

                parameters.push(
                    {
                        name: property[0],
                        val: property[1],
                        type: TYPES.VarChar
                    });
            }
        });

        // parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
        // parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
        // parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
        // parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
        // parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
        // parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
        // parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });

        // Object.entries(req.body).forEach((property) => {
        //     parameters.push({ name: '@' + property[0] })
        // });

        dbContext.post("InsertMHead", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteMHead(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.Int, val: req.data.Id });

            var query = "delete from tbl_MHead where HeadId = @Id"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function getEmployeesWothDepartment(req, res) {

        dbContext.get("GetEmployeeWithDepartment", function (error, data) {
            return res.json(response(data, error));
        });
    }

    function SearchMHead(req, res) {

        var parameters = [];

        parameters.push({ name: 'Salary', type: TYPES.Int, val: req.query.salary });

        var query = "select * from tbl_MHead where salary>=@Salary"

        dbContext.get(query, parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    return {
        getAll: getMHeads,
        get: getMhead,
        post: postMHeads,
        put: putMHead,
        getMulti: getEmployeesWothDepartment,
        find: SearchMHead,
        intercept: findMHead,
        delete: deleteMHead
    }
}

module.exports = MHeadRepository;