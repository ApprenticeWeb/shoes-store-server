import mongoose from "mongoose";


const BrandSchema = new mongoose.Schema({
    nameBrand: {
        type: String,
        require: true,
    },
    imageUrl: String,
}, {timestamps: true,});


export default mongoose.model('Brand', BrandSchema);