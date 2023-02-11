//Server to expost URL
const express = require('express')
//To allow different ports connects itself
const cors = require('cors')
//middleware to parse body req/res to any type
const bodyParser = require('body-parser')
//Knowing as file-upload
const multipart = require('connect-multiparty')


const app = express()
const PORT = 9000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions ={
//   origin: '*',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))

const multipartMiddleware = multipart({uploadDir: "./uploads"})

app.post('/upload', multipartMiddleware, (req, res)=>{
  const files = req.files
  console.log('files ', files)
  res.json({message: files})
})

//Download files EP
app.get('/donwloadExcel', multipartMiddleware,(req, res)=> {
  res.download("./uploads/report.xlsx")
})

app.get('/donwloadPDF', multipartMiddleware,(req, res)=> {
  res.download("./uploads/report.pdf")
})

app.use((err, req, res, next)=> res.json({error: err.message}))


app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
})
