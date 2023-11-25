const userController = require('../controllers/user.controller');
const {fieldCheck,typeCheck,uniqueCheck} = require('../middleware/register.middleware');
const{checkParams} = require('../middleware/params.middleware');

module.exports = (app) => {
    app.post('/api/v1/usermanagement/registeruser',[fieldCheck,typeCheck,uniqueCheck],userController.registerUser);
    app.put('/api/v1/usermanagement/updateuser/:id',[checkParams,typeCheck,uniqueCheck],userController.updateUser);
    app.get('/api/v1/usermanagement/getuser/:id',[checkParams],userController.getUser);
    app.delete('/api/v1/usermanagement/deleteuser/:id',[checkParams],userController.deleteUser);
    app.get('/api/v1/usermanagement/getfiltereduser?',userController.getFilteredUser);
}