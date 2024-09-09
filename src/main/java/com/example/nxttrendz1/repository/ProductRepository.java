package com.example.nxttrendz1.repository;

import com.example.nxttrendz1.model.Product;
import java.util.List;

public interface ProductRepository {
    List<Product> getAllProducts();
    Product getProductById(int productId);
    Product postProduct(Product product);
    Product putProduct(int productId, Product product);
    void deleteProduct(int productId);
}
