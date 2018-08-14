//importing  Builtin modules
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require("body-parser");
const Books      = require('./Bookmodel');

//Setting up the express App
const app = express();
//setting the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Serving static 

//connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/books",{useNewUrlParser:true},(err)=>{
    if(err){
        console.log("error ocured while connecting to database");
    }else{
        console.log("connected to database successfully");
        
    }
});
//Get the / url
app.use(express.static('public'))
// app.get('/',(req,res)=>{
   

// });
//Adding the book
app.post('/addbook',(req,res)=>{
      console.log(req.body);
      addbook = new Books(req.body);
      addbook.save((err,data)=>{
          if(err){
               console.log("could not save the data error occured" +err);
          }else{
              res.send(`${req.body.title} has been saved`);
          }
      }); 
});

app.get('/allbooks',(req,res)=>{
       Books.find({}).exec((err,data)=>{
           if(err){
               console.log("error occured while fetching books");
           }
           else{
              res.jsonp(data);
           }
       });
});
app.get('/booksbyauthor/:authorname',(req,res)=>{
       Books.find(
           {
             author:req.params.authorname
           }
        ).exec((err,data)=>{
           if(err){
               console.log("could not get the data");
           }else{
               res.json(data);
           }
        });
});
//Listing to the server on port 3000
app.listen(3000,()=>{
  console.log("listening on port 3000");
});