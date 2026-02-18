package com.yash.minicrm.controller;

import com.yash.minicrm.entity.Deal;
import com.yash.minicrm.service.DealService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin
public class DealController {

    private final DealService service;

    public DealController(DealService service) {
        this.service = service;
    }

    @PostMapping("/customer/{customerId}")
    public Deal create(@PathVariable Long customerId,
                       @RequestBody Deal deal) {
        return service.createDeal(customerId, deal);
    }

    @GetMapping
    public List<Deal> getAll() {
        return service.getAllDeals();
    }

    @GetMapping("/customer/{customerId}")
    public List<Deal> getByCustomer(@PathVariable Long customerId) {
        return service.getDealsByCustomer(customerId);
    }
}
