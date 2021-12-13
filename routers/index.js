const express=require('express');
const { getAllFavourites, addFavourite, getAllFavouritesByUserId, getFavouriteById, updateFavourite } = require('../model/favourite');
const { addIngredient, getAllIngredients,getIngredientById } = require('../model/ingredient');
const { addRecipe, getAllRecipes,updateRecipe,deleteRecipeById,getRecipeById } = require('../model/recipe');
const router=express.Router();

router.post("/addrecipe",async (req,res)=>{
    console.log(req.body)
    
    const recipes=await getAllRecipes()    
    const recipe=req.body
    recipe.id=recipes.length+1
    try{
    const addedRecipe=await addRecipe(recipe)
    console.log(addedRecipe,"check")
    if(addedRecipe) res.send("posted")
    }
    catch(error){
        console.error(error,"checkErr")
        const err=new Error()
        err.message=error.message
        res.send(err)
    }    
})

router.post("/updaterecipe",async (req,res)=>{  
    const recipe=req.body
    try{
    const addedRecipe=await updateRecipe(recipe)
    console.log(addedRecipe,"check")
    if(addedRecipe) res.send("Updated")
    }
    catch(error){
        console.error(error,"checkErr")
        const err=new Error()
        err.message=error.message
        res.send(err)
    }    
})
router.post("/updateingredient",async (req,res)=>{  
    const ingredient=req.body.ingredient 
    const recipeId=req.body.recipeId
    try{
    const updatedIngredient=await updateIngredient(recipeId,ingredient)
    console.log(updatedIngredient,"check")
    if(updatedIngredient) res.send("Updated")
    }
    catch(error){
        console.error(error,"checkErr")
        const err=new Error()
        err.message=error.message
        res.send(err)
    }    
})
router.post("/updatefavourite",async (req,res)=>{  
  const favourite=req.body

  try{
  const updatedFavourite=await updateFavourite(favourite)
  console.log(updatedFavourite,"check")
  if(updatedFavourite) res.send("Updated")
  }
  catch(error){
      console.error(error,"checkErr")
      const err=new Error()
      err.message=error.message
      res.send(err)
  }    
})
router.post("/addingredient",async (req,res)=>{
    console.log(req.body)
    
    const ingredients=await getAllIngredients()   
    const ingredient=req.body.ingredient 
    const recipeId=req.body.recipeId
    ingredient.id=ingredients.length+1

    try{
    const addedIngredient=await addIngredient(recipeId,ingredient)
   if(addedIngredient) res.send("posted")
    }
    catch(error){
        console.error(error,"checkErr")
        next(error)
    }
    console.log(addedRecipe,"checKHere")
    
})

router.post("/addfavourite",async (req,res)=>{
    console.log(req.body)
    
    const favourites=await getAllFavourites()    
    const favourite=req.body
    favourite.id=favourites.length+1
    try{
    const addedFavourite=await addFavourite(favourite)
    console.log(addedFavourite,"check")
    if(addedFavourite) res.send("posted")
    }
    catch(error){
        console.error(error,"checkErr")
        const err=new Error()
        err.message=error.message
        res.send(err)
    }    
})

router.get("/recipes", async (req,res)=>{
    const recipes= await getAllRecipes();
 
  console.log(recipes)
    if(recipes.length>0) res.send(recipes)
    else{
        const err=new Error()
        err.status=404
        err.message='No Recipes Found'
      res.send(err)
    }
})

router.get("/ingredients", async (req,res)=>{
    const recipes= await getAllIngredients();
 
  console.log(recipes)
    if(recipes.length>0) res.send(recipes)
    else{
        const err=new Error()
        err.status=404
        err.message='No Recipes Found'
      res.send(err)
    }
})
router.get("/favourites", async (req,res)=>{
    const recipes= await getAllFavourites();
 
  console.log(recipes)
    if(recipes.length>0) res.send(recipes)
    else{
        const err=new Error()
        err.status=404
        err.message='No Favourites Found'
      res.send(err)
    }
})
router.get("/favourite", async (req,res)=>{
    const userId=req.query.userId
    const recipes= await getAllFavouritesByUserId(userId);
 
  console.log(recipes)
    if(recipes.length>0) res.send(recipes)
    else{
        const err=new Error()
        err.status=404
        err.message='No Favourites Found'
      res.send(err)
    }
})
router.get("/favouritebyid", async (req,res)=>{
  const favouriteId=req.query.favouriteId
  const recipes= await getFavouriteById(favouriteId);

console.log(recipes)
  if(recipes) res.send(recipes)
  else{
      const err=new Error()
      err.status=404
      err.message='No Favourites Found'
    res.send(err)
  }
})
router.get("/ingredient", async (req,res)=>{
  const ingredientId=req.query.ingredientId
  const recipes= await getIngredientById(ingredientId);

console.log(recipes)
  if(recipes ) res.send(recipes)
  else{
      const err=new Error()
      err.status=404
      err.message='No Ingredients Found'
    res.send(err)
  }
})

router.get("/recipe", async (req,res)=>{
  const recipeId=req.query.recipeId
  const recipes= await getRecipeById(recipeId);

console.log(recipes)
  if(recipes ) res.send(recipes)
  else{
      const err=new Error()
      err.status=404
      err.message='No Recipes Found'
    res.send(err)
  }
})

router.delete("/recipe", async (req,res)=>{
    const recipeId=req.query.recipeId
    const result= await deleteRecipeById(recipeId);
 
  console.log(result)
    if(result.deletedCount>0) res.send(result)
    else{
        const err=new Error()
        err.status=404
        err.message='No Recipes Found'
      res.send(err)
    }
})

router.delete("/favourite", async (req,res)=>{
    const favouriteId=req.query.favouriteId
    const result= await deleteFavouriteById(favouriteId);
 
  console.log(result)
    if(result.deletedCount>0) res.send(result)
    else{
        const err=new Error()
        err.status=404
        err.message='No Recipes Found'
      res.send(err)
    }
})

router.delete("/ingredient", async (req,res)=>{
    const ingredientId=req.query.ingredientId
    const result= await deleteIngredientById(ingredientId);
 
  console.log(result)
    if(result.deletedCount>0) res.send(result)
    else{
        const err=new Error()
        err.status=404
        err.message='No Recipes Found'
      res.send(err)
    }
})
module.exports=router;