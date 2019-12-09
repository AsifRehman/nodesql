const MHeadRepository = require('./mhead.respository');
const dbContext = require('../../Database/dbContext');

module.exports = function (router) {
    const mheadRepository = MHeadRepository(dbContext);

    router.route('/tbl_MHead')
        .get(mheadRepository.getAll)
        .post(mheadRepository.post);
        
//    router.route('/mhead/department')
//    .get(employeeRepository.getMulti);

    router.use('/tbl_MHead/:mheadId', mheadRepository.intercept);

    router.route('/tbl_MHead/:mheadId')
        .get(mheadRepository.get)
        .put(mheadRepository.put)
        .delete(mheadRepository.delete);

}
