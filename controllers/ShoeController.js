import ShoeModel from '../models/Shoe.js'


export const getAllShoes = async (req, res) => {
    try {
        const shoe = await ShoeModel.find().populate('brand').exec();
        res.json(shoe);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить список продуктов',
        });
    }
}

export const createShoe = async (req, res) => {
    try {
        const doc = new ShoeModel({
            name: req.body.name,
            brand: req.body.brand,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            price: req.body.price,
        });
        const shoe = await doc.save();
        res.json(shoe);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать новый продукт',
        });
    }
}

export const deleteShoe = async (req, res) => {
    try {
        const shoeId = req.params.id;

        ShoeModel.findOneAndDelete({
            _id: shoeId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить Продукт',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Продукт не найдена',
                })
            }
            res.json({
                success: true,
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить Продукт",
        });
    }
}

export const updateShoe = async (req, res)=>{
    try{
        const shoeId = req.params.id;
        await ShoeModel.updateOne({
            _id: shoeId,
        },{
            name: req.body.name,
            brand: req.body.brand,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            price: req.body.price,
        });
        res.json({
            success: true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить Продукт",
        });
    }
}