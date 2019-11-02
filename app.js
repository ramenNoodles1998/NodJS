const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')

app.use('/public', express.static(path.join(__dirname,'static')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'))
}).listen(3000)

app.get('/example',(req, res)=>{
    res.send('hitting example route')
})

app.get('/example/:name/:age',(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send(req.params.name+" : "+req.params.age)
})

app.post('/',(req,res)=>{
    console.log(req.body)
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    })
    Joi.validate(req.body, schema,(err, result)=>{
        console.log(err)
        if(err){
            
            res.send('an error has occurred')
        }
        console.log(result)
        res.send('successfully posted data')
    })
    //res.json({success : true})
})