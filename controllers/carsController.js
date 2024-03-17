const fs = require('fs')

const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/cars.json`)
)

const getRootEndPoint = (req, res, next) => {

    res.status(200).json({
        message: "ping successfully"
    })
}

const getCarsData = (req, res, next) => {

    console.log("Get Cars Data")
    res.status(200).json({
        status:"success",
        message: "success getting cars data",
        data: {
            cars
        }
    })
}

const createCarData = (req, res) => {
    const newCar = req.body

    cars.push(newCar)

    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), 
    (err) => {
        res.status(201).json({
            status: "success",
            message: "success creating a new car",
            created_data: {
                newCar
            }
        })
    })
}

const getCarById = (req, res, next) => {
    const id = req.params.id

    const car = cars.find(carId => carId.id === id)

    res.status(200).json({
        status: "success",
        message: "success getting a car by id",
        data:{
            car
        }
    })
}

const updateCarById = (req, res) => {
    const id = req.params.id

    const car = cars.find(carId => carId.id === id)
    const carIndex = cars.findIndex(carId => carId.id === id)

    if(!car){
        return res.status(404).json({
            status: "fail",
            message: `car with ID: ${id} doesn't exist`
        })
    }

    cars[carIndex] = {...cars[carIndex], ...req.body}

    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: "success",
            message: "success updating a car by id",
            updated_data: cars[carIndex]
        })
    })
}

const deleteCarById = (req, res) => {
    const id = req.params.id

    const car = cars.find(carId => carId.id === id)
    const carIndex = cars.findIndex(carId => carId.id === id)

    if(!car){
        res.status(404).json({
            status: "fail",
            message: `Car with ID: ${id} doesn't exist`
        })
    }

    const deletedCar = cars.splice(carIndex, 1)

    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), 
    (err) => {
        res.status(200).json({
            status: "success",
            message: "success deleting a car by id",
            deleted_data: deletedCar
        })
    })
}

module.exports = {
    getRootEndPoint,
    getCarsData,
    createCarData,
    getCarById,
    updateCarById,
    deleteCarById
}