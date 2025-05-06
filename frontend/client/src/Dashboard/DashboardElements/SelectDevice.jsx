// src/Dashboard/DashboardElements/SelectDevice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cpu, Thermometer, Droplet, Sun } from 'lucide-react';

const deviceMap = {
1: { name: "TEMPERATURE SENSOR", icon: <Thermometer size={24} /> },
  2: { name: "HUMIDITY SENSOR", icon: <Droplet size={24} /> },
  3: { name: "PRESSURE SENSOR", icon: <Cpu size={24} /> },
  4: { name: "LIGHT SENSOR", icon: <Sun size={24} /> }
};

const SelectDevice = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [threshold, setThreshold] = useState('');
  const [message, setMessage] = useState('');
  const [disabledDevices, setDisabledDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]); // New state to store fetched devices

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      // Fetch user's devices based on the username
      axios.get(`http://localhost:8082/api/devices/${username}`)
        .then(res => setUserDevices(res.data)) // Update state with devices data
        .catch(err => console.error("Failed to fetch devices:", err));
    }
  }, [username]);

  const handleDeviceClick = (id) => {
    if (!disabledDevices.includes(id)) {
      setSelectedDeviceId(id);
      setThreshold('');
      setMessage('');
      console.log('Device Selected:', id);
    }
  };

  const handleRegister = async () => {
    if (!threshold || !selectedDeviceId || !username) {
      setMessage("Missing fields");
      return;
    }

    const payload = {
      username,
      deviceid: selectedDeviceId,
      threshold
    };

    console.log('Sending to backend:', payload);

    try {
      const res = await axios.post("http://localhost:8082/api/devices/register", payload);

      setMessage(`✅ Registered: ${deviceMap[selectedDeviceId]?.name || 'Device'}`);
      setDisabledDevices([...disabledDevices, selectedDeviceId]);
      setThreshold('');
      setSelectedDeviceId(null);
    } catch (err) {
      console.error("Registration failed:", err);
      setMessage("❌ Registration failed");
    }
  };

  return (
<div className="bg-black text-white min-h-screen p-8">
  <h2 className="text-3xl font-light tracking-wide  mb-6">SELECT DEVICE</h2>

  {/* Device Selection Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
    {Object.entries(deviceMap).map(([id, { name, icon }]) => {
      const isSelected = selectedDeviceId === parseInt(id);
      const isDisabled = disabledDevices.includes(parseInt(id));

      return (
        <div
          key={id}
          onClick={() => !isDisabled && handleDeviceClick(parseInt(id))}
          className={`cursor-pointer p-5 border transition-colors duration-200 
            ${isSelected ? 'border-white/50 bg-white text-black' : 'border-white/20 bg-black text-white'}
            ${isDisabled ? 'cursor-not-allowed opacity-40' : 'hover:border-white'}
          `}
          style={{ borderRadius: '0px' }} // Sharp edge override
        >
          <div className="flex justify-center mb-2 opacity-80">{icon}</div>
          <p className="text-center text-base">{name}</p>
        </div>
      );
    })}
  </div>

  {/* Threshold Set Section */}
  {selectedDeviceId && (
    <div className="bg-black p-6 max-w-md mx-auto border border-white/10" style={{ borderRadius: '0px' }}>
      <h3 className="text-xl font-light tracking-wide mb-4">{deviceMap[selectedDeviceId]?.name || 'Device'}</h3>
      <input
        type="text"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        className="w-full px-4 py-3 bg-white/8 text-white border border-black focus:outline-none"
        placeholder="Threshold"
        style={{ borderRadius: '0px' }}
      />
      <button
        onClick={handleRegister}
        className="mt-4 w-full bg-white text-black font-light py-3 border border-white hover:bg-black hover:text-white transition-colors"
        style={{ borderRadius: '0px' }}
      >
        Register Device
      </button>
    </div>
  )}

  {/* Success Message */}
  {message && (
    <p className="text-center text-sm mt-6 text-green-400">{message}</p>
  )}

  {/* My Devices Table */}
  <div className="mt-10 bg-black p-6 border border-white/20" style={{ borderRadius: '0px' }}>
    <h3 className="text-xl font-light tracking-wide mb-4">MY DEVICES</h3>
    {userDevices.length === 0 ? (
      <p className="text-center text-white opacity-60">You have no devices registered yet.</p>
    ) : (
      <table className="min-w-full text-white/60 border-t border-white/10">
        <thead>
          <tr className="border-b border-white font-light">
            <th className="py-3 px-6 text-left"> </th>
            <th className="py-3 px-6 text-left font-light">THRESHOLD</th>
          </tr>
        </thead>
        <tbody>
          {userDevices.map((device, index) => (
            <tr key={index} className="hover:bg-white/10 hover:text-white/100 transition-colors">
              <td className="py-3 px-6">{deviceMap[device.deviceid]?.name || 'UNKNOWN DEVICE'}</td>
              <td className="py-3 px-6">{device.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>



  );
};

export default SelectDevice;
