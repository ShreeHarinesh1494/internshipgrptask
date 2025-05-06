package com.iot.device.service;
import java.util.*;

import com.iot.device.dto.DeviceRequest;
import com.iot.device.dto.DeviceResponse;
import com.iot.device.model.Device;
import com.iot.device.repository.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public DeviceResponse registerDevice(DeviceRequest request) {
        Device device = new Device();
        device.setDeviceId(request.getDeviceid());
        device.setUsername(request.getUsername());
        device.setThreshold(request.getThreshold());

        System.out.println("The Device id: "+request.getDeviceid());

        // Save the device entity
        Device savedDevice = deviceRepository.save(device);

        // Now map the saved device values to the response
        DeviceResponse response = new DeviceResponse();
        response.setDeviceid(savedDevice.getDeviceId());  // Use savedDevice to get correct values
        response.setUsername(savedDevice.getUsername());
        response.setThreshold(savedDevice.getThreshold());

        return response;
    }

    public List<DeviceResponse> getallDeviceByUsername(String username){
        List<Device> devices = deviceRepository.findByUsername(username);
        List<DeviceResponse> responseList = new ArrayList<>();
        for(Device d : devices ){
            DeviceResponse  deviceResponse = new DeviceResponse();
            deviceResponse.setDeviceid(d.getDeviceId());
            deviceResponse.setUsername(d.getUsername());
            deviceResponse.setThreshold(d.getThreshold());
            responseList.add(deviceResponse);
        }
        return responseList;

    }
    public List<DeviceResponse> getDeviceByUsernameandDeviceId(String username,int id){
        Optional<Device> device = deviceRepository.findByUsernameAndDeviceId(username, id);
        if (device.isPresent()) {
            Device d = device.get();
            DeviceResponse res = new DeviceResponse();
            res.setDeviceid(d.getDeviceId());
            res.setUsername(d.getUsername());
            res.setThreshold(d.getThreshold());
            return List.of(res);
        }
        return new ArrayList<>();

    }
    public DeviceResponse updateThresholdByUsernameandDeviceId(String username, int id, String newThreshold) {
        List<Device> devices = deviceRepository.findDevicesByUsernameAndDeviceId(username, id);

        if (devices != null && !devices.isEmpty()) {
            for (Device device : devices) {
                device.setThreshold(newThreshold);
                deviceRepository.save(device); // Save each updated device
            }

            // Prepare response for one of the updated devices (or you can iterate over all if needed)
            Device updatedDevice = devices.get(0);
            DeviceResponse response = new DeviceResponse();
            response.setDeviceid(updatedDevice.getDeviceId());
            response.setUsername(updatedDevice.getUsername());
            response.setThreshold(updatedDevice.getThreshold());
            return response;
        }

        return null; // If no devices found
    }





}
