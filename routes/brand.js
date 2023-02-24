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

router.post('/', [passportJWT.isLogin], [checkAdmin.isAdmin],
[
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อแบรนด์ด้วย")
]
, brandController.insert);

router.post('/product', [passportJWT.isLogin], [checkAdmin.isAdmin],
[
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อนาฬิกาด้วย"),
    body("price").not().isEmpty().withMessage("กรุณาป้อนราคาด้วย"),
    body("brand").not().isEmpty().withMessage("กรุณาป้อนแบรนด์ของนาฬิกาด้วย")
]
, brandController.insertproduct);

router.delete('/:id', [passportJWT.isLogin], [checkAdmin.isAdmin], brandController.destroy);

router.put('/:id', [passportJWT.isLogin], [checkAdmin.isAdmin], brandController.update);

router.delete('/product/:id', [passportJWT.isLogin], [checkAdmin.isAdmin], brandController.destroyproduct);

router.put('/product/:id', [passportJWT.isLogin], [checkAdmin.isAdmin], brandController.updateproduct);

module.exports = router;


