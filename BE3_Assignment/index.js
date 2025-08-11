const express = require('express')
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello, This is Express Assignment Server.')
})

const albums = [
  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },
  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },
  { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 }
]

app.post('/albums', (req, res) => {
    // const albumId = parseInt(req.params.id)
    const dataToadd = req.body

    if(!dataToadd){
        res.status(404).json({error: "Data not found"})
    }else{
        if(!dataToadd.title || !dataToadd.artist || !dataToadd.year){
        res.status(400).json({error: "Title, artist and year are required."})
    }else{
        albums.push(dataToadd)
        res.status(200).json({message: "New album data added successfully.", newAlbum: dataToadd})
    }
    }
})

app.get('/albums', (req,res) => {
    res.send(albums)
})

app.delete('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id)

    const index = albums.findIndex((album) => album.id === albumId)

    if(index === -1){
        res.status(404).json({error: "Error deleting the data."})
    }else{
        albums.splice(index, 1)
        res.status(200).json({message: "Data deleted successfully."})
    }
})


app.post('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id)
    const dataToUpdate = req.body

    const findDataToUpdate = albums.find((album) => album.id === albumId)

    if(!findDataToUpdate){
        res.status(404).json({error: "Data not found"})
    }else{
        if(!findDataToUpdate.title || !findDataToUpdate.artist || !findDataToUpdate.year){
            res.status(400).json({error: "Title, artist and year are required."})
        }else{
            Object.assign(findDataToUpdate, dataToUpdate)
            res.status(200).json({message: "Data updated successfully.", updatedData: dataToUpdate})
        }
    }
})



const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log('Server connected to port', PORT)
})

