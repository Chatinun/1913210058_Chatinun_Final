var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require("express-validator");
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

//router.get('/', [passportJWT.isLogin], [checkAdmin.isAdmin], companyController.index);

router.get('/', brandController.index);

router.get('/product', brandController.product);

router.get('/:id', brandController.brandproduct);

router.post('/',
[
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อแบรนด์ด้วย")
]
, brandController.insert);

router.delete('/:id', brandController.destroy);

router.put('/:id', brandController.update);

module.exports = router;


