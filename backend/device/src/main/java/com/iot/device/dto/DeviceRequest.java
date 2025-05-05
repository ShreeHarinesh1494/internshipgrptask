package com.iot.device.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeviceRequest {
    @NotBlank(message = "device id required")
    private int deviceid;
    @NotBlank(message = "username is required")
    private String username;
    private String threshold;
}
