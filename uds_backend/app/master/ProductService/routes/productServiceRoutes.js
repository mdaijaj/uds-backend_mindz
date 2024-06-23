const express = require('express')
const router = express.Router();

const productServiceController = require('../controller/productServiceController')


router.post('/api/v1/createProductService',productServiceController.createProductService);
router.get('/api/v1/allProductService',productServiceController.allProductService);
router.get('/api/v1/allActiveProductService',productServiceController.allActiveProductService);
router.get('/api/v1/allProductServiceById/:id',productServiceController.allProductServiceById);
router.put('/api/v1/updateProductServiceById/:id',productServiceController.updateProductServiceById);
router.delete('/api/v1/deleteProductionServiceById/:id',productServiceController.deleteProductionServiceById);
router.put("/api/v1/productServiceStatus/:id", productServiceController.productServiceStatus);


module.exports = router;