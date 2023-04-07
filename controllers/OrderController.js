import OrderModel from '../models/Order.js'


export const getAllOrder = async (req, res) => {
    try {
        const order = await OrderModel.find();
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить список Ордеров',
        });
    }
}

export const createOrder = async (req, res) => {
    try {
        const doc = new OrderModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            date: (new Date()).toLocaleDateString("en-US"),
            purchase: req.body.purchase,
        });
        const order = await doc.save();
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать Ордер',
        });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        OrderModel.findOneAndDelete({
            _id: orderId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить Ордер',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Ордер не найдена',
                })
            }
            res.json({
                success: true,
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить Ордер",
        });
    }
}

export const updateOrder = async (req, res)=>{
    try{
        const orderId = req.params.id;
        await OrderModel.updateOne({
            _id: orderId,
        },{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            purchase: req.body.purchase,
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