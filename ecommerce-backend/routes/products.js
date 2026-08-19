import express from 'express';
import { Product } from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  // Search flow step 8:
  // The backend reads the search text from the query string.
  // Example: /api/products?search=shirt makes search equal to "shirt".
  const search = req.query.search;

  let products;
  if (search) {
    products = await Product.findAll();

    // Search flow step 9:
    // Convert the search text to lowercase so the search is case-insensitive.
    // This lets "SHIRT", "shirt", and "Shirt" match the same products.
    // Filter products by case-insensitive search on name or keywords
    const lowerCaseSearch = search.toLowerCase();

    products = products.filter(product => {
      // Search flow step 10:
      // Check if the search text appears inside the product name.
      const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);

      // Search flow step 11:
      // Also check if the search text appears inside any product keyword.
      const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearch));

      // Search flow step 12:
      // Keep the product if the name matches or if one of the keywords matches.
      return nameMatch || keywordsMatch;
    });

  } else {
    products = await Product.findAll();
  }

  // Search flow step 13:
  // Send either the filtered products or all products back to the frontend.
  res.json(products);
});

export default router;
