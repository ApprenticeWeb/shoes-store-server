import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phone: String,
    date: String,
    purchase:[
        {
            product: String,
            count: Number,
        }
    ]
}, {timestamps: true});


export default mongoose.model('Order', OrderSchema);