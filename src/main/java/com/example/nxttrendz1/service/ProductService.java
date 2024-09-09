package com.example.nxttrendz1.service;

import com.example.nxttrendz1.model.Product;
import com.example.nxttrendz1.repository.ProductJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductJpaRepository productJpaRepository;

    public List<Product> getAllProducts() {
        return productJpaRepository.findAll();
    }

    public Optional<Product> getProductById(int productId) {
        return productJpaRepository.findById(productId);
    }

    public Product postProduct(Product product) {
        return productJpaRepository.save(product);
    }

    public Optional<Product> putProduct(int productId, Product product) {
        return productJpaRepository.findById(productId).map(existingProduct -> {
            existingProduct.setProductName(product.getProductName());
            existingProduct.setPrice(product.getPrice());
            return productJpaRepository.save(existingProduct);
        });
    }

    public void deleteProduct(int productId) {
        productJpaRepository.deleteById(productId);
    }
}
