const connection=require("../connection/index")
const { getRecipeById } = require("./recipe")

addIngredient=async (recipeId,ingredient)=>{
    return connection.ingredientCollection.getCollection().then(database=>{
       return database.create(ingredient).then((result)=>{
            if(result){
                console.log("ingredient insertion successful")
                return connection.recipeCollection.getCollection().then(db=>{
                    return db.updateMany(
                        {id:recipeId},
                        { $push: { ingredients: result } },
                        { new: true, useFindAndModify: false }
                      ).then((result)=>{
                          if(result) return result
                      });
                })
            }
            else{
                let error = new Error("ingredient insert failed in database")
                error.status = 501
                error.name='Insertion failed'
                throw error
            }
        })
    }).catch((err)=>{
        throw err;
    })
}

getAllIngredients=async ()=>{
    return connection.ingredientCollection.getCollection().then(database=>
        database.find().then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}
getIngredientById=async (id)=>{
    return connection.ingredientCollection.getCollection().then(database=>
        database.findOne({id:id}).then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

updateIngredient=async (recipeId,ingredient)=>{
    const ingredientFound=await getIngredientById(ingredient.id)
    return connection.ingredientCollection.getCollection().then(database=>{
       return database.updateMany({id:ingredient.id},{$set:Object(ingredient)}).then((result)=>{
            if(result){
                console.log("ingredient insertion successful")
              
                return connection.recipeCollection.getCollection().then(async (db)=>{
                    const recipe=await getRecipeById(recipeId)
                    console.log(recipe,recipeId)
                    const index=recipe['ingredients'].findIndex((item)=>item.id==ingredient.id)
                    recipe.ingredients[index]=ingredient
                    return db.updateMany(
                        {id:recipeId},
                        { $set: Object(recipe) },
                        { new: true, useFindAndModify: false }
                      ).then((result)=>{
                          if(result) return result
                      });
                })
            }
            else{
                let error = new Error("ingredient insert failed in database")
                error.status = 501
                error.name='Insertion failed'
                throw error
            }
        })
    }).catch((err)=>{
        throw err;
    })
}

deleteIngredientById=async (ingredientId)=>{
    return connection.ingredientCollection.getCollection().then(database=>
        database.deleteOne({id:ingredientId}).then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

module.exports={addIngredient,getAllIngredients,deleteIngredientById,updateIngredient,getIngredientById}
