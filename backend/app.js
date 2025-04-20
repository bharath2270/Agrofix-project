const express=require("express")
const mongoose=require('mongoose')
const cors = require("cors");
const app=express()
app.use(express.json());  

app.use(cors());



const ProductRoute=require('./Routes/Product.route')
const OrderRoute=require('./Routes/Order.route')
const AuthRoute = require('./Routes/Auth.route');

app.use('/products',ProductRoute)
app.use('/orders',OrderRoute)
app.use('/auth', AuthRoute); 

mongoose.connect(
    'mongodb+srv://bharathkumar:g4uocdUXGNeIK3U4@cluster0.jnsrkls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(()=>{
    console.log("mongodb connected....")
})




app.use((req,res,next)=>{
    const err=new Error("not found")
    err.status=404
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
})
app.listen(8000,()=>{
    console.log("Server is running")
})