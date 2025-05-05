package com.iot.device.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeviceResponse {

    private int deviceid;
    private String username;
    private String threshold;
}
