const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

const cors=require("cors");
require("dotenv").config();

const app=express();
const port=process.env.PORT||5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once("open",()=>{
  console.log("connected to mongodb");
});


const exerciseRouter=require("./routes/exercises");
const userRouter=require("./routes/users");
app.use("/exercises",exerciseRouter);
app.use("/users",userRouter);

app.listen(port,()=>{
  console.log("server started at port "+port);
})