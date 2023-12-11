const mongoose=require("mongoose")
const blog=require("./src/model/blog")



mongoose.connect("mongodb://localhost:27017/blogApp")
.then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(`error occured : ${err}`)
})


module.exports=blog
