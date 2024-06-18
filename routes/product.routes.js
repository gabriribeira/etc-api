const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");
const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../validations/product.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateProduct,
  handleValidationErrors,
  productController.createProduct
);

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of all products.
 *       500:
 *         description: Internal server error.
 */
router.get("/", productController.getAllProducts);

/**
 * @openapi
 *  /products/category/{categoryId}:
 *  get:
 *  summary: Retrieve products by category
 * description: Retrieve a list of products by category.
 * parameters:
 * - in: path
 * name: categoryId
 * required: true
 * schema:
 * type: string
 * description: ID of the category to retrieve products from.
 * responses:
 * 200:
 * description: A list of products by category.
 * 500:
 * description: Internal server error.
 */
router.get("/category/:categoryId", productController.getProductsByCategory);

/**
 * @openapi
 * /products/search:
 *  get:
 *   summary: Search for items
 *  description: Search for items by name.
 * parameters:
 * - in: query
 *  name: name
 * required: true
 * schema:
 * type: string
 * description: Name of the item to search for.
 * responses:
 * 200:
 * description: A list of items matching the search query.
 * 500:
 * description: Internal server error.
 */
router.get("/search", productController.searchProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieve a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: The requested product.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", productController.getProductById);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateProduct,
  handleValidationErrors,
  productController.updateProduct
);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete.
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
