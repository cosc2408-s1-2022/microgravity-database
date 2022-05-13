package com.rmit.mgdb.controller;

import org.apache.tika.Tika;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ExperimentAttachmentsController {

    @GetMapping(value = "/images/{name}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public void getImage(@PathVariable String name, HttpServletResponse response) throws IOException {
        Path root = Paths.get("images");
        InputStream stream = new FileInputStream(root.resolve(name).toFile());
        Tika tika = new Tika();
        String type = tika.detect(name);
        response.setContentType(type);
        StreamUtils.copy(stream, response.getOutputStream());
    }

    @GetMapping(value = "/documents/{name}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void getPdf(@PathVariable String name, HttpServletResponse response) throws IOException {
        Path root = Paths.get("documents");
        InputStream stream = new FileInputStream(root.resolve(name).toFile());
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        StreamUtils.copy(stream, response.getOutputStream());
    }

}
