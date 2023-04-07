import BrandModel from "../models/Brand.js";


export const getAllBrands = async (req, res) => {
    try {
        const brand = await BrandModel.find();
        res.json(brand);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить список Бренедов',
        });
    }
}

export const createBrand = async (req, res) => {
    try {
        const doc = new BrandModel({
            nameBrand: req.body.nameBrand,
            imageUrl: req.body.imageUrl,
        });
        const brand = await doc.save();
        res.json(brand);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать новый Бренд",
        });
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id;

        BrandModel.findOneAndDelete({
            _id: brandId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить Бренд',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Бренд не найдена',
                })
            }
            res.json({
                success: true,
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить Бренд",
        });
    }
}

export const updateBrand = async (req, res)=>{
    try{
        const brandId = req.params.id;
        await BrandModel.updateOne({
            _id: brandId,
        },{
            nameBrand: req.body.nameBrand,
            imageUrl: req.body.imageUrl,
        });
        res.json({
            success: true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить Бренд",
        });
    }
}