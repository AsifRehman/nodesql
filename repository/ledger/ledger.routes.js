const LedgerRepository = require('./ledger.respository');
const dbContext = require('../../Database/dbContext');

module.exports = function (router) {
const ledgerRepository = LedgerRepository(dbContext);
    router.route('/Ledger')
        .get(ledgerRepository.getLedgers);
}
