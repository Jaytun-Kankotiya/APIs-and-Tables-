const {initializeData} = require('./db/db.connect')

const fs = require('fs')
const Car = require('./models/cars.models')

initializeData()

const jsonData = fs.readFileSync('cars.json', 'utf-8')

const carData = JSON.parse(jsonData)

function seedData(){
    try {
        for(const data of carData ){
            const newCar = new Car({
                brand: data.brand,
                model: data.model,
                year: data.year,
                bodyStyle: data.bodyStyle,
                fuelType: data.fuelType,
                transmission: data.transmission,
                engine: data.engine,
                mileage: data.mileage,
                color: data.color,
                price: data.price,
                condition: data.condition,
                description: data.description,
                photos: data.photos,
                inMarket: data.inMarket
            })
            newCar.save()
        }

    } catch (error){
        console.log('Error seeding the data', error)
    }
}


// seedData()


const carData2 = [{
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg"
  ]
},
{
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg"
  ]
}
]

async function seedData2(){
    try {
        for(const newcars of carData2){
            const newCarData = new Car(newcars)
            const saveCardata = await newCarData.save()
            console.log(saveCardata)
        }
    } catch (error) {
        throw error
    }
}
// seedData2()

async function readAllCars(){
    try {
        const readAllCarsData = await Car.find()
        console.log(readAllCarsData)
    } catch (error) {
        console.log('Error fetching all cars data', error)
    }
}
// readAllCars()

async function readCarsByBrand(carsBrand){
    try {
        const readDataByBrand = await Car.findOne({brand: carsBrand})
        console.log(readDataByBrand)
    } catch (error) {
        console.log('Error fetching data by car brand', error)
    }
}
// readCarsByBrand('Ford')

async function readCarsDataByColor(carsColor){
    try {
        const readCarByColor = await Car.findOne({color: carsColor})
        console.log(readCarByColor)
    } catch (error) {
        console.log('Error fetching data by its color', error)
    }
}
// readCarsDataByColor('Black')

async function updatePrice(carBrand, dataToUpdate){
    try {
        const updatePriceByModel = await Car.findOneAndUpdate({brand: carBrand}, dataToUpdate, {new: true})
        console.log(updatePriceByModel)
    } catch (error){
        throw error
    }
}
// updatePrice('Honda', {price: 2300000})


async function readCarWithModel(car_Model, dataToUpdate){
    try {
        const updateCondition = await Car.findOneAndUpdate({model: car_Model}, dataToUpdate, {new: true})
        console.log(updateCondition)
    } catch (error) {
        console.log('Error updating condition')
    }
}
// readCarWithModel('Model S', {condition: 'Used'})


async function deleteCarById(car_ID){
    try {
        const deleteCarData = await Car.findByIdAndDelete(car_ID)
        console.log(deleteCarData)
    } catch (error){
        console.log('Error deleting car data by Car_ID', error)
    }
}
// deleteCarById('68324dd982a3038dad11e0e7')

async function deleteCarByBodyStyle(carBodyStyle){
    try {
        const deleteDataByBodyStyle = await Car.findOneAndDelete({bodyStyle: carBodyStyle})
        console.log(deleteDataByBodyStyle)
    } catch (error){
        console.log('Error deleting car data by its body style', error)
    }
}
deleteCarByBodyStyle('Coupe')