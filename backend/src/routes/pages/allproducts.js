const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');

router.get('/allproducts', async (req, res) => {
    try {
        // Fetch all products from the database
        const allProducts = await Product.find().lean();
        
        // Send the fetched products as a response
        res.status(200).json(allProducts);
    } catch (error) {
        // If an error occurs during fetching, send an error response
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

router.post('/addproduct', async (req, res) => {
    try {
        // Check if request body is empty
        if (!req.body) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        // Create a new product instance
        const newProduct = new Product(req.body);

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Return a success response with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        // Handle any errors that occur during product creation or saving
        console.error("Error adding product:", error);
        res.status(500).json({ error: "An error occurred while adding the product" });
    }
});

router.delete('/deleteproduct/:productId', async (req, res) => {
    try {
        // Extract the productId from the request parameters
        const productId = req.params.productId;

        // Check if the productId is provided
        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Check if the product with the given ID exists
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return a success response with the deleted product
        res.status(200).json(deletedProduct);
    } catch (error) {
        // Handle any errors that occur during product deletion
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "An error occurred while deleting the product" });
    }
});



module.exports = router;