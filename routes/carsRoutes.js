const express = require("express")
const router = express.Router()

const carsController = require("../controllers/carsController")

router.route('/').get(carsController.getRootEndPoint)
router.route('/cars').get(carsController.getCarsData).post(carsController.createCarData)
router.route('/cars/:id').get(carsController.getCarById).patch(carsController.updateCarById).delete(carsController.deleteCarById)

module.exports = router
