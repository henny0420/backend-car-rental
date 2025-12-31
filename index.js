require('dotenv').config();
const express = require('express')
const app = express()
var cors = require('cors')
const port = 4000
var jwt = require('jsonwebtoken');
const ConnectDB = require('./db/dbConnection');
const { error } = require('console');
const ROUTES = require('./routes')


ConnectDB()
.then(()=>{
    app.listen(port , () => {
        console.log(`Example app listening on port ${port}`)
        
    })
}).catch(()=> {
    console.error("error : ",error)
})

app.use(express.json())
app.use(cors())

app.use('/user',ROUTES.USER)

app.use('/role',ROUTES.ROLE)

app.use('/brand',ROUTES.BRAND)


