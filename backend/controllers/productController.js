import asyncHandler from "express-async-handler";
import Products from "../models/productModel.js";

// //@desc    Fetch all products
// //@route   GET /api/products
// //@access  Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});

  res.json(products);
});

// //@desc    Fetch single product
// //@route   GET /api/products/:id
// //@access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// //@desc    Delete a product
// //@route   DELETE /api/products/:id
// //@access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// //@desc    Create a product
// //@route   POST /api/products
// //@access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await Products({
    name: "Sample name",
    image: "/images/sample.jpg",
    description: "Sample description",
    brand: "Sample brand",
    category: "Sample category ",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// //@desc    Update a product
// //@route   PUT /api/products
// //@access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  } = req.body;
  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
