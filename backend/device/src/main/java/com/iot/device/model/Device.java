package com.iot.device.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;  // Unique identifier for the entity
    private int deviceId;  // Can contain duplicates
    @Column(nullable = false)
    private String username;
    private String threshold;

}
