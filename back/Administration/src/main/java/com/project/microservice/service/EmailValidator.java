package com.project.microservice.service;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
	@Override
    public boolean test(String email) {
        if (email == null || email.isEmpty()) {
            return false; // L'adresse e-mail ne doit pas être nulle ou vide
        }

        // Expression régulière pour la validation d'une adresse e-mail
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

        return email.matches(regex);
    }
}