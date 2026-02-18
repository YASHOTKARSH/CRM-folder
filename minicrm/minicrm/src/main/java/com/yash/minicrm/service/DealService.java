package com.yash.minicrm.service;

import com.yash.minicrm.entity.Customer;
import com.yash.minicrm.entity.Deal;
import com.yash.minicrm.repository.CustomerRepository;
import com.yash.minicrm.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealService {

    private final DealRepository dealRepository;
    private final CustomerRepository customerRepository;

    public DealService(DealRepository dealRepository,
                       CustomerRepository customerRepository) {
        this.dealRepository = dealRepository;
        this.customerRepository = customerRepository;
    }

    public Deal createDeal(Long customerId, Deal deal) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        deal.setCustomer(customer);

        return dealRepository.save(deal);
    }

    public List<Deal> getDealsByCustomer(Long customerId) {
        return dealRepository.findByCustomerId(customerId);
    }

    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

}
