const MHeadRepository = require('./mhead.respository');
const dbContext = require('../../Database/dbContext');

module.exports = function (router) {
    const mheadRepository = MHeadRepository(dbContext);

    router.route('/mhead')
        .get(mheadRepository.getAll)
        .post(mheadRepository.post);
        
//    router.route('/mhead/department')
//    .get(employeeRepository.getMulti);

    router.use('/mhead/:mheadId', mheadRepository.intercept);

    router.route('/mhead/:mheadId')
        .get(mheadRepository.get)
        .put(mheadRepository.put)
        .delete(mheadRepository.delete);

}
