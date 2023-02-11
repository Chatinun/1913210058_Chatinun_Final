var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')
// const passportJWT = require('../middleware/passportJWT');
// const checkAdmin = require('../middleware/checkAdmin');

//router.get('/', [passportJWT.isLogin], [checkAdmin.isAdmin], companyController.index);

router.get('/', productController.index);

//router.post('/', companyController.insert);

// router.delete('/:id', companyController.destroy);

// router.put('/:id', companyController.update);

module.exports = router;