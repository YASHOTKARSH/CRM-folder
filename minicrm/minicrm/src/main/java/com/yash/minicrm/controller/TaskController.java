package com.yash.minicrm.controller;

import com.yash.minicrm.entity.Task;
import com.yash.minicrm.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/deal/{dealId}")
    public Task create(@PathVariable Long dealId,
                       @RequestBody Task task) {
        return service.createTask(dealId, task);
    }

    @GetMapping("/deal/{dealId}")
    public List<Task> getByDeal(@PathVariable Long dealId) {
        return service.getTasksByDeal(dealId);
    }

    @PutMapping("/{taskId}/status")
    public Task updateStatus(@PathVariable Long taskId,
                             @RequestParam String status) {
        return service.updateTaskStatus(taskId, status);
    }

    @DeleteMapping("/{taskId}")
    public void delete(@PathVariable Long taskId) {
        service.deleteTask(taskId);
    }
}
