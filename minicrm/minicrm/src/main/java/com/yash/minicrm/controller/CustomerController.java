package com.yash.minicrm.controller;

import com.yash.minicrm.entity.Customer;
import com.yash.minicrm.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        return service.createCustomer(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        return service.getAllCustomers();
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer customer) {
        return service.updateCustomer(id, customer);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCustomer(id);
    }
}