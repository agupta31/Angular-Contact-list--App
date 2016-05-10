var express=require("express"),
    app=express(),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser"),
    port=process.env.PORT||3000;

    // app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
    app.use(bodyParser.json());

   mongoose.connect("mongodb://localhost/myContacts");

  //creating mongoose schema

   var contactSchema=new mongoose.Schema({
       
             name:String,
             age:Number,
             email:String
   });

  var contact78=mongoose.model("contacts34",contactSchema);

 
  app.get("/contactList",function(req,res){
       contact78.find({},function(err,data){
             if(err)
                 console.log(err);
             else
                 res.json(data);
           
       });
  });

 app.post("/contactList",function(req,res){
        
        console.log(req.body);
     
        contact78.create(req.body,function(err,response){
               if(err)
                    console.log(err);
               else
                    console.log("data saved");
        });
 });

 app.get("/contactList/:id",function(req,res){
       
      contact78.findById(req.params.id,function(err,data){
              if(err)
                  console.log(err);
              else
                  res.json(data);
      });
          
       
 });

app.put("/contactList/:id",function(req,res){
      
      contact78.findByIdAndUpdate(req.params.id,req.body,function(err,data){
             if(err)
                console.log(err);
             else
                console.log(data);
      });
});

app.delete("/contactList/:id",function(req,res){
      
    contact78.findByIdAndRemove(req.params.id,req.body,function(err,data){
           if(err)
            console.log(err);
           else 
             console.log("data deleted");   
    });
});


   app.listen(port,function(){
       console.log("server started.......");
   });
