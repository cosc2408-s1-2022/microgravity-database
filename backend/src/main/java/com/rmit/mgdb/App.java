package com.rmit.mgdb;

import org.apache.commons.io.FileUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class App {

    public static void main(String[] args) {
        // Create the resources folders if they do not exist.
        File documents = Paths.get("documents").toFile();
        File images = Paths.get("images").toFile();

        // Clean the indices' folder from previous residuals.
        try {
            FileUtils.cleanDirectory(new File(Paths.get("data").resolve("indices").toString()));
        } catch (Exception ignored) {
            // If the directories do not exist.
        }

        if (!documents.exists() && !documents.mkdir() || !images.exists() && !images.mkdir()) {
            System.exit(1);
        } else {
            SpringApplication.run(App.class, args);
        }
    }

}
