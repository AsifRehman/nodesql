const PartyRepository = require('./party.respository');
const dbContext = require('../../Database/dbContext');

module.exports = function (router) {
const partyRepository = PartyRepository(dbContext);
    router.route('/Party')
        .get(partyRepository.getParties);
}
