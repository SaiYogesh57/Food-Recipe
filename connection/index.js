const mongoose=require("mongoose")
 const Schema=mongoose.Schema

 let recipeSchema={
     "id":{
        type:Number,
        required:true,
     },
     "rating":{
         type:Number,
         required:true,
     },
     "userId":{
        type:Number,
        required:true,
    },
     "preparationTime":{
        type:String,
        required:true,
        
     },
     "description":{
         type:String,
       required:true
     },
    "ingredients":{
        type:[Object]
    },
    "photos":{
        type:[String],
        required:true
    }
 }
 let ingredientSchema={
    "id":{
        type:Number,
        required:true,
    },
    "name":{
        type:String,
        required:true,
    },
    "description":{
        type:String,
        required:true,
    },
 }
 let favouriteSchema={
    "id":{
        type:Number,
        required:true,
    },
    "recipeId":{
        type:Number,
        required:true,
    },
    "userId":{
        type:Number,
        required:true,
    },
 }

 let recipeAccountSchema=new Schema(recipeSchema,{collection:"recipe",timestamps:true})
 let ingredientsSchema=new Schema(ingredientSchema,{collection:"ingredient",timestamps:true})
 let favouritesSchema=new Schema(favouriteSchema,{collection:"favourite",timestamps:true})

 let recipeCollection={}
 let ingredientCollection={}
 let favouriteCollection={}

 recipeCollection.getCollection=()=>{
     return mongoose.connect("mongodb://127.0.0.1:27017/foodrecipe",{useNewUrlParser:true,useUnifiedTopology:true}).then(db=>{
        return db.model("recipe",recipeAccountSchema)
     }).catch((err)=>{
        let error=new Error("Could not connect to database")
        error.status= 500;
        throw error
    })

 }
 ingredientCollection.getCollection=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/foodrecipe",{useNewUrlParser:true,useUnifiedTopology:true}).then(db=>{
       return db.model("ingredients",ingredientsSchema)
    }).catch((err)=>{
       let error=new Error("Could not connect to database")
       error.status= 500;
       throw error
   })

}
favouriteCollection.getCollection=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/foodrecipe",{useNewUrlParser:true,useUnifiedTopology:true}).then(db=>{
       return db.model("favourites",favouritesSchema)
    }).catch((err)=>{
       let error=new Error("Could not connect to database")
       error.status= 500;
       throw error
   })

}

 module.exports={recipeCollection,ingredientCollection,favouriteCollection};