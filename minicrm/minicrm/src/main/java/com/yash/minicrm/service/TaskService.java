package com.yash.minicrm.service;

import com.yash.minicrm.entity.Deal;
import com.yash.minicrm.entity.Task;
import com.yash.minicrm.repository.DealRepository;
import com.yash.minicrm.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final DealRepository dealRepository;

    public TaskService(TaskRepository taskRepository,
                       DealRepository dealRepository) {
        this.taskRepository = taskRepository;
        this.dealRepository = dealRepository;
    }

    public Task createTask(Long dealId, Task task) {

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Deal not found"));

        task.setDeal(deal);
        task.setStatus("Pending");

        return taskRepository.save(task);
    }

    public List<Task> getTasksByDeal(Long dealId) {

        if (!dealRepository.existsById(dealId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Deal not found");
        }

        return taskRepository.findByDealId(dealId);
    }

    public Task updateTaskStatus(Long taskId, String status) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        task.setStatus(status);

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {

        if (!taskRepository.existsById(taskId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }

        taskRepository.deleteById(taskId);
    }
}
