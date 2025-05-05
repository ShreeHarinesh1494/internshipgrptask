package com.iot.device.repository;

import com.iot.device.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, String> {
    List<Device> findByUsername(String username);
    Optional<Device> findByUsernameAndDeviceId(String username, int deviceid);
}
