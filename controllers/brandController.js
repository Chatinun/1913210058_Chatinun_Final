const Brand = require('../models/brand');
const Product = require('../models/product');
const config = require("../config/index");
const { validationResult } = require("express-validator");

exports.index = async (req, res, next) => {

  const brands = await Brand.find({},{ createdAt: 0, updatedAt: 0, __v: 0}).sort({name: 1});

  res.status(200).json({
    data: brands,
  });
};

exports.product = async (req, res, next) => {
  ///const menus = await Menu.find().select('+name -price');

  //const products = await Product.find().where("price").gt(200).populate("brand");
  const products = await Product.find({},{ createdAt: 0, updatedAt: 0, __v: 0 }).populate("brand");

  res.status(200).json({
    data: products,
  });
};

exports.brandproduct = async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById({ _id: id }).populate("product");

  res.status(200).json({
    data: brand,
  });
};

exports.insert = async (req, res, next) => {
  try {
    const { name, established } = req.body;
    
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let brand = new Brand({
      name: name,
      established: established
    });
    await brand.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertproduct = async (req, res, next) => {
  try {
    const { name, price, brand, family, movement } = req.body;
    
    const tempBrand = Brand.findOne(({_id: brand}));
    if(!tempBrand){
      const error = new Error("ไม่พบข้อมูลแบรนด์");
      error.statusCode = 400;
      throw error;
    }
    
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let product = new Product({
      name: name,
      price: price,
      brand: brand,
      family: family,
      movement: movement
    });
    await product.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.deleteOne({
      _id: id,
    });

    if (brand.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error)
  }
};

exports.update = async (req, res, next) => {
  try {
		const { id } = req.params;
    const { name, established } = req.body;

		const brand = await Brand.findOneAndUpdate({_id: id}, {
			name: name,
      established: established
		})

    if(!brand){
      const error = new Error("ไม่พบข้อมูลแบรนด์");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
    
  } catch (error) {
    next(error);
  }
};


