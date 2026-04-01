package net.miarma.backend.core.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.miarma.backlib.dto.*;
import net.miarma.backlib.security.PasswordGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import net.miarma.backend.core.model.Credential;
import net.miarma.backend.core.service.AuthService;
import net.miarma.backend.core.service.CredentialService;
import net.miarma.backlib.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private final AuthService authService;

    public AuthController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(
            new LoginResponse(response.token(), response.user(), response.account())
        );
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
    
    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(
                new ApiErrorDto(
                    401,
                    "Unauthorized",
                    "No hay token",
                    "/v2/core/auth/change-password"
                )
            );
        }

        String token = authHeader.substring(7);
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(401).body(
                new ApiErrorDto(
                    401,
                    "Unauthorized",
                    "Token inválido",
                    "/v2/core/auth/change-password"
                )
            );
        }

        UUID userId = jwtService.getUserId(token);
        Byte serviceId = jwtService.getServiceId(token);

        String newToken = jwtService.generateToken(userId, serviceId);

        return ResponseEntity.ok(Map.of(
            "token", newToken,
            "userId", userId,
            "serviceId", serviceId
        ));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(
              new ApiErrorDto(
              401,
              "Unauthorized",
              "No hay token",
              "/v2/core/auth/change-password"
              )
            );
        }

        String token = authHeader.substring(7);
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(401).body(
                new ApiErrorDto(
                    401,
                    "Unauthorized",
                    "Token inválido",
                    "/v2/core/auth/change-password"
                )
            );
        }

        UUID userId = jwtService.getUserId(token);

        authService.changePassword(userId, request);
        return ResponseEntity.ok(Map.of("message", "Contraseña cambiada correctamente"));
    }

    @PostMapping("/reset-password/{serviceId}/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> resetPassword(
        @PathVariable("serviceId") Byte serviceId,
        @PathVariable("userId") UUID userId
    ) {
        try {
            String password = PasswordGenerator.generate(8);
            authService.resetPassword(userId, password, serviceId);
            return ResponseEntity.ok(Map.of("status", 200, "password", password));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                new ApiErrorDto(
                    500,
                    "Internal Server Error",
                    "No se ha podido resetear la contraseña",
                    "/v2/core/auth/reset-password"
                )
            );
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        return ResponseEntity.ok(jwtService.validateToken(token));
    }
}
