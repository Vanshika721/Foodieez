const mongoose=require('mongoose');
const mongoURI='mongodb+srv://Foodieez:vAnshika$777@cluster0.nhpf9nn.mongodb.net/Foodieezmern?retryWrites=true&w=majority'

const mongoDB=async()=>{
    mongoose.set('strictQuery',false);
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err){
            console.log("---",err)
        }
        else{
            console.log("connected");
            const fetched_data=await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("food_Category");
                foodCategory.find({}).toArray(async function(err,catdata){
                if(err){
                    console.log(err);
                }
                else{
                    global.food_items=data;
                    global.food_Category=catdata;
                }
            })
        })
           
        }
    });
}


module.exports=mongoDB;
