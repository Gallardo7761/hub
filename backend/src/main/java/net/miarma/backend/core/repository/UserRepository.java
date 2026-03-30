package net.miarma.backend.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.miarma.backend.core.model.User;

public interface UserRepository extends JpaRepository<User, byte[]> {

}
