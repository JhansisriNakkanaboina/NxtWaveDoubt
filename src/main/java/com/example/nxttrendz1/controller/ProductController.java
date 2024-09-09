package com.example.nxttrendz1.controller;

import com.example.nxttrendz1.model.Product;
import com.example.nxttrendz1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // API 1: GET /products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // API 2: POST /products
    @PostMapping
    public Product postProduct(@RequestBody Product product) {
        return productService.postProduct(product);
    }

    // API 3: GET /products/{productId}
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable int productId) {
        try {
            Product product = productService.getProductById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return ResponseEntity.ok(product);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }

    // API 4: PUT /products/{productId}
    @PutMapping("/{productId}")
    public ResponseEntity<Product> putProduct(@PathVariable int productId, @RequestBody Product product) {
        try {
            Product updatedProduct = productService.putProduct(productId, product)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }

    // API 5: DELETE /products/{productId}
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.noContent().build(); // 204 NO CONTENT
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }
}
