// Import controllers
const { verify } = require('crypto');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validateFn = require('./middlewares/validateFn')
const verifyFn = require('./middlewares/verifyFn')


// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register', validateFn.validateRegistration, authController.processRegister);
    //router.post('/api/user/register', authController.processRegister);
    //Original Code ^
    router.post('/api/user/process-submission', validateFn.validateCreateSubmission, checkUserFn.getClientUserId, userController.processDesignSubmission);
    //router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission);
    //Original Code ^
    router.put('/api/user/', userController.processUpdateOneUser);
    router.put('/api/user/design/',verifyFn.verifyTokenUserID, validateFn.validateUpdateSubmission, userController.processUpdateOneDesign);
    //router.put('/api/user/design/', userController.processUpdateOneDesign);
    //Original Code ^
    router.post('/api/user/processInvitation/', checkUserFn.getClientUserId, userController.processSendInvitation);

    router.get('/api/user/process-search-design/:pagenumber/:search?',validateFn.validateSearchSubmission, checkUserFn.getClientUserId, userController.processGetSubmissionData);
    //router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
    //Original Code ^
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId',verifyFn.verifyTokenUserID, userController.processGetOneUserData);
    //router.get('/api/user/:recordId', userController.processGetOneUserData);
    //Original Code ^
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);

};