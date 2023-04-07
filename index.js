import express from "express";
import mongoose from "mongoose";
import {brandCreateValidation, shoeCreateValidation} from "./validations/validation.js";
import {createBrand, deleteBrand, getAllBrands, updateBrand} from "./controllers/BrandController.js"
import {createShoe, deleteShoe, getAllShoes, updateShoe} from "./controllers/ShoeController.js";
import cors from "cors";
import multer from "multer";
import {createOrder, deleteOrder, getAllOrder, updateOrder} from "./controllers/OrderController.js";


mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.ki4d58z.mongodb.net/shoe-store?retryWrites=true&w=majority')
    .then(() => console.log('Data Base connect, OK'))
    .catch((err) => console.log('Data Base connect, error >>>', err));

const app = express();

// --Для загрузки файлов
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});
// --


app.use(cors());// необходим для запроса сс фронта на сервер
app.use('/uploads', express.static('uploads'));
app.use(express.json());// чтобы post мог читать формат json или иначе будет ошибка >>> Cannot read properties of undefined


app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/', (req, res) => {
    res.send({
        success: "true",
    });
})


app.get('/brands/', getAllBrands);
app.post('/brand', brandCreateValidation, createBrand);
app.delete('/brand/:id', deleteBrand);
app.patch('/brand/:id', updateBrand)

app.get('/shoes/', getAllShoes);
app.post('/shoe', shoeCreateValidation, createShoe);
app.delete('/shoe/:id', deleteShoe);
app.patch('/shoe/:id', updateShoe)

app.get('/order/', getAllOrder);
app.post('/order/', createOrder);
app.delete('/order/:id', deleteOrder);
app.patch('/order/:id', updateOrder)

app.listen(4000, (err) => {
    if (err) return console.log(err);
    console.log('Server work, OK');
});
