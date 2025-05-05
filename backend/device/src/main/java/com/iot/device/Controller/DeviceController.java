package com.iot.device.Controller;


import com.iot.device.dto.DeviceRequest;
import com.iot.device.dto.DeviceResponse;
import com.iot.device.service.DeviceService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/devices")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/register")
    public ResponseEntity<DeviceResponse> registerDevice(@RequestBody DeviceRequest request) {
        DeviceResponse response = deviceService.registerDevice(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<DeviceResponse>> getAllDevicesByUsername(@PathVariable String username) {
        List<DeviceResponse> responses = deviceService.getallDeviceByUsername(username);
        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{username}/{deviceId}")
    public ResponseEntity<List<DeviceResponse>> getDeviceByUsernameAndDeviceId(@PathVariable String username,
                                                                               @PathVariable int deviceId) {
        List<DeviceResponse> response = deviceService.getDeviceByUsernameandDeviceId(username, deviceId);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-threshold")
    public ResponseEntity<DeviceResponse> updateThreshold(@RequestParam String username,
                                                          @RequestParam int deviceId,
                                                          @RequestParam String newThreshold) {
        DeviceResponse response = deviceService.updateThresholdByUsernameandDeviceId(username, deviceId, newThreshold);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
