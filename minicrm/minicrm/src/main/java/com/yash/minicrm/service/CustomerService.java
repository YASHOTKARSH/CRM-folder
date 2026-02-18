package com.yash.minicrm.service;

import com.yash.minicrm.entity.Customer;
import com.yash.minicrm.entity.Organization;
import com.yash.minicrm.repository.CustomerRepository;
import com.yash.minicrm.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final OrganizationRepository organizationRepository;

    private Long getLoggedInOrganizationId() {
        // TEMPORARY hardcoded
        return 1L;
    }

    public CustomerService(CustomerRepository customerRepository,
                           OrganizationRepository organizationRepository){
        this.customerRepository = customerRepository;
        this.organizationRepository = organizationRepository;

    }

    public Customer createCustomer(Customer customer) {

        Organization org = organizationRepository.findById(getLoggedInOrganizationId())
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        customer.setOrganization(org);

        return customerRepository.save(customer);
    }


    public List<Customer> getAllCustomers() {
        return customerRepository.findByOrganizationId(getLoggedInOrganizationId());
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existing.setName(updatedCustomer.getName());
        existing.setEmail(updatedCustomer.getEmail());
        existing.setPhone(updatedCustomer.getPhone());
        existing.setCompany(updatedCustomer.getCompany());

        return customerRepository.save(existing);
    }


    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
