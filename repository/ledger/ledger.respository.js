var response = require('../../shared/response');

var TYPES = require('tedious').TYPES;

function LedgerRepository(dbContext) {
    function getLedgers(req, res) {
        var params = [];

        if (req.query.ts) {
            params.push({ name: 'ts', type: TYPES.Int, val: req.query.ts });

            dbContext.getQuery("select id, partyid, VocNo, Date, TType, Description, NetDebit debit, NetCredit credit, CAST(ts as int) ts from tbl_Ledger WHERE ts>@ts", params, false, function (error, data) {

                return res.json(response(data, error));
            });
        }

        if (req.query.id)
        {
            params.push({ name: 'id', type: TYPES.Int, val: req.query.id });

            dbContext.getQuery("select delid from tbl_Ledger_Del WHERE id>@id", params, false, function (error, data) {

                return res.json(response(data, error));
            });
          
        }
    }

    return { getLedgers };
}

module.exports = LedgerRepository;