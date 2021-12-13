const connection=require("../connection/index")

addRecipe= async (recipe)=>{
    return connection.recipeCollection.getCollection().then(database=>database.create(recipe).then((result)=>result).catch((err)=>{throw err})).catch((err)=>{
        throw err;
    })
}

updateRecipe= async (recipe)=>{
    return connection.recipeCollection.getCollection().then(database=>database.updateMany({id:recipe.id},{$set:Object(recipe)}).then((result)=>result).catch((err)=>{throw err})).catch((err)=>{
        throw err;
    })
}

getAllRecipes=async ()=>{
    return connection.recipeCollection.getCollection().then(database=>
        database.find().then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}
getRecipeById=async (recipeId)=>{
    return connection.recipeCollection.getCollection().then(database=>
        database.findOne({id:recipeId}).then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}
deleteRecipeById=async (recipeId)=>{
    return connection.recipeCollection.getCollection().then(database=>
        database.deleteOne({id:recipeId}).then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

module.exports={ addRecipe,getAllRecipes,getRecipeById,deleteRecipeById,updateRecipe }