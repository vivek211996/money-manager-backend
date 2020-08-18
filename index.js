const express = require("express")
const mongodb = require("mongodb")
const app = express();
const bodyparser = require("body-parser")
const cors = require("cors");
const dotEnv = require("dotenv").config();


const url = process.env.DB;
app.use(bodyparser.json())
app.use(cors());



app.get("/login",async function(req,res){
    
    try {
        console.log("hello this is login server")
        let client = await mongodb.connect(url)
        console.log(url)
       let db = client.db("CRM")
        let data = await db.collection("Login").find().toArray();
        await client.close(data);
        res.json(data)
       
    } catch (error) {
        console.log("server catch")
    console.log(error)
    }
})


app.post("/register",async function(req,res){
    console.log(req.body)
    
    
try {
    let client = await mongodb.connect(url)
   let db = client.db("CRM")
    let data = await db.collection("Login").insertOne(req.body)
    await client.close();
    res.json({
        message:"saved"
    })
   
} catch (error) {
console.log(error)
}

  
    })

    app.get("/transactions",async function(req,res){
    
        try {
            
            let client = await mongodb.connect(url)
            console.log(url)
           let db = client.db("CRM")
            let data = await db.collection("transactions").find().toArray();
            await client.close(data);
            res.json(data)
            console.log(data)
           
        } catch (error) {
            console.log("server catch")
        console.log(error)
        }
    })
    

    app.post("/adddata",async function(req,res){
        console.log(req.body)
        
        
    try {
        let client = await mongodb.connect(url)
       let db = client.db("CRM")
        let data = await db.collection("transactions").insertOne(req.body)
        await client.close();
        res.json({
            message:"saved"
        })
       
    } catch (error) {
    console.log(error)
    }
         
        })

        app.delete("/delete",async function(req,res){
            console.log(req.body)
            console.log(req.params.id)
            
        try {
            let client = await mongodb.connect(url)
           let db = client.db("CRM")
            let data = await db.collection("transactions").deleteOne({id:req.params.id})
            await client.close();
            res.json({
                message:"saved"
            })
           
        } catch (error) {
        console.log(error)
        }
             
            })
         
     

app.listen( process.env.PORT ||4040,function(){
    console.log("server listening")
}) 

