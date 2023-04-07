import {body} from "express-validator";


export const brandCreateValidation = [
    body('nameBrand', 'Название бренда должно быть не меньше 2-х симвлов').isLength({min: 2}),
    body('imageUrl','Неверная ссылка на изображение').optional().isString(),
];

export const shoeCreateValidation = [
    body('name', 'Название должно быть не меньше двух символов').isLength({min: 2}).isString(),
    body('imageUrl', 'Не верная ссылка на изображение').optional().isString(),
    body('description', 'Должнеж быть текст').isString(),
    body('price', 'Должно быть число').isNumeric()
];
