const express =require("express")
const app = express();
app.use(express.json())

const mongoose=require("mongoose")

const cors=require("cors")
app.use(cors()); 

const mongoDburl="mongodb://localhost:27017/SkyTrends"
mongoose.connect(mongoDburl)
.then(()=>{
    console.log("Connected to database")
})
.catch((e)=>{
    console.log(e);
})

app.listen(5000,()=> console.log("Server Started"));

const userRoutes=require('./Routes/User_Routes');

app.use('/users',userRoutes);