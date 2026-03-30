package net.miarma.backend.core.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import net.miarma.backend.core.model.File;

public interface FileRepository extends JpaRepository<File, byte[]> {	
    List<File> findByUploadedBy(UUID uploadedBy);

    List<File> findByContext(Byte context);

    List<File> findByUploadedByAndContext(UUID uploadedBy, Byte context);
}