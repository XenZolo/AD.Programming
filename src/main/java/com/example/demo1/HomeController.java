package com.example.demo1;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")  
public class HomeController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Welcome to Spring Boot!";
    }

}
