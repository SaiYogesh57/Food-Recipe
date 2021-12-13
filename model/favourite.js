const { favouriteCollection } = require("../connection");


addFavourite= async (favourite)=>{
    return favouriteCollection.getCollection().then(database=>database.create(favourite).then((result)=>result).catch((err)=>{throw err})).catch((err)=>{
        throw err;
    })
}
updateFavourite= async (favourite)=>{
    return favouriteCollection.getCollection().then(database=>database.updateMany({id:favourite.id},{$set:Object(favourite)}).then((result)=>result).catch((err)=>{throw err})).catch((err)=>{
        throw err;
    })
}
getAllFavourites=async ()=>{
    return favouriteCollection.getCollection().then(database=>
        database.find().then((result)=>result).catch((err)=>err)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

getAllFavouritesByUserId=async (userId)=>{
    return favouriteCollection.getCollection().then(database=>
        database.find({userId:userId}).then((result)=>result).catch((err)=>err)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

getFavouriteById=async (id)=>{
    return favouriteCollection.getCollection().then(database=>
        database.findOne({id:id}).then((result)=>result).catch((err)=>err)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

deleteFavouriteById=async (favId)=>{
    return connection.favouriteCollection.getCollection().then(database=>
        database.deleteOne({id:favId}).then((result)=>result)
    ).catch((err)=>Promise.reject("No results returned"))
  
}

module.exports={addFavourite,getAllFavourites,getAllFavouritesByUserId,deleteFavouriteById,getFavouriteById,updateFavourite}