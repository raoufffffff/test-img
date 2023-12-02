const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const PORT = process.env.PORT || 3001

app.use('/a', express.static('a'));

app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./a")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })


app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/rr', (req, res) => {
    res.send(PORT)
})



app.post('/upload', upload.single('file'), (req, res) => {
    const imagePath = `a/${req.file.filename}`;
    res.json({ imagePath })
})




app.listen(PORT, console.log("good"))