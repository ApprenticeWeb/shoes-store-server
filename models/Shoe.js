import mongoose from "mongoose";


const ShoeSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    brand:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        require: true,
    },
    imageUrl: String,
    description: String,
    price: Number,
},{timestamps: true});


export default mongoose.model('Shoe', ShoeSchema);