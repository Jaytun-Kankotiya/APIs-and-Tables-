const express = require('express')
const  {initializeData}  = require('./db/db.connect')
const Recipe = require('./models/recipe.models')

const app = express()
app.use(express.json())


initializeData()

app.post('/recipes', async (req, res) => {
    try{
        const dataToAdd = new Recipe(req.body)
        const saveNewData = await dataToAdd.save()
        if(saveNewData){
            res.status(200).json({message: "New recipe added successfully.", saveNewData})
        }else{
            res.status(404).json({error: "Failed to add new data."})
        }
    } catch(error){
        res.status(500).json({error: "Recipe not found"})
    }
})

app.get('/recipes', async (req, res) => {
    try{
        const recipeData = await Recipe.find()
        if(recipeData){
            res.json(recipeData)
        }else{
            res.status(404).json({error: "Failed to fetch the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})

app.get('/recipes/title/:recipeTitle', async (req, res) => {
    try{
        const recipeWithTitle = await Recipe.findOne({title: req.params.recipeTitle})
        if(recipeWithTitle){
            res.json(recipeWithTitle)
        } else{
            res.status(404).json({error: "Failed to fetch the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})

app.get('/recipes/author/:recipeAuthor', async (req, res) => {
    try{
        const recipeWithAuthor = await Recipe.findOne({author: req.params.recipeAuthor})
        if(recipeWithAuthor){
            res.json(recipeWithAuthor)
        } else{
            res.status(404).json({error: "Failed to fetch the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})


app.get('/recipes/difficulty', async (req, res) => {
    try{
        const recipeWithDifficulties = await Recipe.findOne({difficulty: "Easy"})
        if(recipeWithDifficulties){
            res.json(recipeWithDifficulties)
        } else{
            res.status(404).json({error: "Failed to fetch the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})


app.post('/recipes/difficulty/:id', async (req, res) => {
    try{
        const updatedData = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updatedData){
            res.status(200).json({message: "Recipe data updated successfully.", updatedData})
        } else{
            res.status(404).json({error: "Failed to update the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})

app.post('/recipes/time/title/:recipeName', async (req, res) => {
    try{
        const recipeUpdate = await Recipe.findOneAndUpdate({title: req.params.recipeName}, req.body, {new: true})
        if(recipeUpdate){
            res.status(200).json({message: "Recipe prep time and cook time updated successfully.", recipeUpdate})
        } else{
            res.status(404).json({error: "Failed to update the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})

app.delete('/recipes/:id', async (req, res) => {
    try{
        const dataToDelete = await Recipe.findByIdAndDelete(req.params.id)
        if(dataToDelete){
            res.status(200).json({message: "Data deleted successfully."})
        }else{
            res.status(404).json({error: "Failed to update the data."})
        }
    } catch (error){
        res.status(500).json({error: "Recipe not found"})
    }
})

const PORT = 3000

app.listen(PORT, (req, res) => {
    console.log("Server connected on Port", PORT)
})