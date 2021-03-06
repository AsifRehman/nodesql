var response = require('../../shared/response');

var TYPES = require('tedious').TYPES;

function PartyRepository(dbContext) {
    function getParties(req, res) {
        var params = [];

        if (req.query.ts) {
            params.push({ name: 'ts', type: TYPES.Int, val: req.query.ts });

            dbContext.getQuery("select partynameid id, partyname, partytypeid, debit, credit, isUpdated, CAST(ts as int) ts from tbl_Party WHERE ts>@ts", params, false, function (error, data) {

                return res.json(response(data, error));
            });
        }

        if (req.query.id) {
            params.push({ name: 'id', type: TYPES.Int, val: req.query.id });

            dbContext.getQuery("select delid from tbl_Party_Del WHERE id>@id", params, false, function (error, data) {

                return res.json(response(data, error));
            });

        }
    }

    return { getParties };
}

module.exports = PartyRepository;