const { StatusCodes } = require("http-status-codes");
const { productModel } = require("../models/products");

const getCategoryDeals = async (req, res) => {
    const { category } = req.query;
    try {
        const data = await productModel.find({ category });
        if (!data) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide category" });

        res.status(StatusCodes.OK).json({ data });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}

const searchProduct = async (req, res) => {
    const { name } = req.params;
    try {
        const data = await productModel.find(
            {
                name: { $regex: name, $options: 'i' } //search by name
            }
        );

        if (!data) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide correct name" });

        res.status(StatusCodes.OK).json({ data });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
    }
}

const updateRating = async (req, res) => {
    const { id } = req.user;
    const { rating, productId } = req.body;

    try {
        let data = await productModel.findOne({ _id: productId });
        const oldRating = data.rating.filter(data => {
            return data.userId !== id;
        });
        const newRating = [...oldRating, { userId: id, rating }];
        data.rating = newRating;
        data = await data.save();
        // const ratingData = await productModel.({ _id: productId }, newRating, {
        //     new: true, runValidators: true
        // },);

        if(!data) return res.status(StatusCodes.BAD_REQUEST).json({msg:"please wait a minute!!"});
        res.status(StatusCodes.OK).json({data});


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

const dealOfDay = async (req, res) => {
    try {
        const data = await productModel.find({});

        // sort deal of the day 
        data.sort((a, b) =>{
            aSum = 0;
            bSum = 0;

            for(i = 0; i < a.rating.length; i++){
                aSum = a.rating[i].rating
            }
            for(i = 0; i < b.rating.length; i++){
                aSum = b.rating[i].rating
            }

            return aSum < bSum ? 1 : -1;
        })

        res.status(StatusCodes.OK).json({data: data[0]});
    } catch (error) {
        
    }
}

module.exports = {
    getCategoryDeals,
    searchProduct,
    updateRating,
    dealOfDay
}