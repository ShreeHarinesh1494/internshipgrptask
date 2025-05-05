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

    public DeviceResponse registerDevice(DeviceRequest request){
        Device device = new Device();
        device.setDeviceId(request.getDeviceid());
        device.setUsername(request.getUsername());
        device.setThreshold(request.getThreshold());

        Device savedDevice = deviceRepository.save(device);
        DeviceResponse save = new DeviceResponse();
        save.setDeviceid(save.getDeviceid());
        save.setUsername(savedDevice.getUsername());
        save.setThreshold(save.getThreshold());
        return save;
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
        Optional<Device> optionalDevice = deviceRepository.findByUsernameAndDeviceId(username, id);

        if (optionalDevice.isPresent()) {
            Device device = optionalDevice.get();
            device.setThreshold(newThreshold);
            Device updated = deviceRepository.save(device);

            DeviceResponse response = new DeviceResponse();
            response.setDeviceid(updated.getDeviceId());
            response.setUsername(updated.getUsername());
            response.setThreshold(updated.getThreshold());
            return response;
        }

        return null;
    }


}
