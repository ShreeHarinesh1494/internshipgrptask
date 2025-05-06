// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// import { Thermometer, Droplet, Cpu, Sun } from 'react-feather';

// const deviceMap = {
//   1: { name: "Temperature Sensor", icon: <Thermometer size={20} /> },
//   2: { name: "Humidity Sensor", icon: <Droplet size={20} /> },
//   3: { name: "Pressure Sensor", icon: <Cpu size={20} /> },
//   4: { name: "Light Sensor", icon: <Sun size={20} /> }
// };

// const GetDeviceAnalytics = () => {
//   const [deviceList, setDeviceList] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const [interpretation, setInterpretation] = useState(null);
//   const [deviceNameMap, setDeviceNameMap] = useState({});
//   const [newThreshold, setNewThreshold] = useState('');
//   const username = localStorage.getItem('username');

//   useEffect(() => {
//     axios.get(`http://localhost:8082/api/devices/${username}`)
//       .then(res => {
//         setDeviceList(res.data);
//         console.log('Device List:', res.data);
//         // Map the devices to their names based on their device id
//         const map = {};
//         res.data.forEach(device => {
//           const id = device.deviceid;
//           const nameFromType = deviceMap[device.deviceid]?.name || "Unknown Device";
//           map[device.deviceid] = nameFromType;
//         });

//         setDeviceNameMap(map); // Store the mapping
//       })
//       .catch(err => console.error('Error fetching devices:', err));
//   }, [username]);

//   useEffect(() => {
//     console.log('Selected Device ID:', selectedDeviceId);
//     if (selectedDeviceId) {
//       axios.get(`http://localhost:5000/api/analytics/${selectedDeviceId}`)
//         .then(res => setAnalyticsData(res.data))
//         .catch(err => console.error('Error fetching analytics data:', err));

//       axios.get(`http://localhost:5000/api/deviceInterpretation/${selectedDeviceId}`)
//         .then(res => setInterpretation(res.data))
//         .catch(err => console.error('Error fetching interpretation:', err));
//     }
//   }, [selectedDeviceId]);

//   const handleThresholdUpdate = () => {
//     axios.put(`http://localhost:8082/api/devices/update-threshold`, null, {
//       params: {
//         username,
//         deviceId: selectedDeviceId,
//         newThreshold
//       }
//     }).then(() => {
//       alert('Threshold updated!');
//       setNewThreshold('');
//     }).catch(err => console.error('Error updating threshold:', err));
//   };

//   const renderPieChart = () => {
//     // Monochromatic palette with better contrast
//     const MONO_COLORS = [
//       '#FFFFFF', '#E0E0E0', '#BDBDBD', '#9E9E9E',
//       '#757575', '#616161', '#424242', '#212121'
//     ];
  
//     const pieData = deviceList.map(d => ({
//       name: deviceMap[d.deviceid]?.name || 'Unknown',
//       value: 1
//     }));
  
//     return (
//       <ResponsiveContainer width="100%" height={250}>
//         <PieChart>
//           <Pie
//             color="#00000"
//             data={pieData}
//             dataKey="value"
//             nameKey="name"
//             outerRadius={100}
//             innerRadius={70}
//             paddingAngle={1}
//             stroke="#000"
//             strokeWidth={0.5}
//           >
//             {pieData.map((entry, index) => (
//               <Cell
//                 key={index}
//                 fill={MONO_COLORS[index % MONO_COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: 'rgba(0, 0, 0, 0.85)',
//               borderRadius: '0',
//               padding: '10px',
//               color: '#FFFFFF',
//               boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//               border: '1px solid rgba(255, 255, 255, 0.1)'
//             }}
//             labelStyle={{ color: '#FFFFFF' }}
//             itemStyle={{ color: '#FFFFFF' }}
//             formatter={(value, name) => [
//               `${name}`, 
//               `${value} device${value !== 1 ? 's' : ''}`
//             ]}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     );
//   };
  
//   const handleDeviceSelect = (deviceId) => {
//     setSelectedDeviceId(deviceId);
//   };

//   return (
// <div className="min-h-screen bg-black text-white">
//   {/* Page title */}
//   <div className="relative pt-12 pb-8 px-6 md:px-10">
//     <div className="w-16 h-px bg-white/20 mb-4"></div>
//     <h1 className="text-4xl font-light tracking-wide">DEVICE ANALYTICS</h1>
//   </div>

//   <div className="px-6 md:px-10 pb-16">
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
//       {/* Sidebar: Pie Chart first, then Devices */}
//       <div className="border border-white/10 p-8">
//         {/* Pie Chart Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-8">
//             <div className="w-8 h-px bg-white/50 mr-4"></div>
//             <h3 className="text-sm font-light tracking-wider uppercase">Distribution</h3>
//           </div>
//           {deviceList.length > 0 ? renderPieChart() : (
//             <div className="text-sm text-white/50">No data for pie chart</div>
//           )}
//         </div>

//         {/* Devices List */}
//         <div>
//           <div className="flex items-center mb-10">
//             <div className="w-8 h-px bg-white mr-4"></div>
//             <h2 className="text-xl font-light tracking-wider uppercase">Devices</h2>
//           </div>

//           {deviceList.length > 0 ? (
//             <div className="space-y-4">
//               {deviceList.map((device, index) => {
//                 const deviceidd = device.deviceid;
//                 const devType = device.devicetype;
//                 const icon = deviceMap[devType]?.icon;
//                 const name = deviceMap[deviceidd]?.name || 'Unknown Device';
//                 const threshold = device.threshold;

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleDeviceSelect(device.deviceid)}
//                     className={`flex items-center w-full px-4 py-5 group transition-all duration-300 border border-transparent hover:border-white/30 ${selectedDeviceId === device.deviceid ? 'border-white/30 bg-white/5' : ''}`}
//                   >
//                     <div className="mr-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
//                       {icon}
//                     </div>
//                     <div className="flex-1 text-left">
//                       <div className="uppercase tracking-wider text-sm font-light">{name}</div>
//                       <div className="opacity-50 text-xs mt-1">Threshold: {threshold}</div>
//                     </div>
//                     <div className="h-px w-4 bg-white/30 transform transition-all duration-300 group-hover:w-6"></div>
//                   </button>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="py-12 text-center text-white/50">
//               <p className="uppercase tracking-wider text-sm">No devices found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Analytics Section */}
//       <div className="col-span-2 border border-white/10 p-8">
//         {selectedDeviceId ? (
//           <>
//             <div className="flex items-center mb-16">
//               <div className="w-8 h-px bg-white mr-4"></div>
//               <h2 className="text-xl font-light tracking-wider uppercase">
//                 {deviceMap[selectedDeviceId]?.name || 'Unknown Device'}
//               </h2>
//             </div>

//             {/* Data Cards */}
//             {interpretation && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
//                 <div className="border border-white/10 p-6">
//                   <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Min Value</p>
//                   <p className="text-3xl font-light">{interpretation.minValue}</p>
//                 </div>
//                 <div className="border border-white/10 p-6">
//                   <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Max Value</p>
//                   <p className="text-3xl font-light">{interpretation.maxValue}</p>
//                 </div>
//                 <div className="border border-white/10 p-6">
//                   <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Average</p>
//                   <p className="text-3xl font-light">{interpretation.averageValue}</p>
//                 </div>
//                 <div className="border border-white/10 p-6">
//                   <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Latest</p>
//                   <p className="text-3xl font-light">{interpretation.latestValue}</p>
//                 </div>
//               </div>
//             )}

//             {/* Bar Chart */}
//             {analyticsData.length > 0 ? (
//               <div className="mb-16">
//                 <div className="flex items-center mb-8">
//                   <div className="w-8 h-px bg-white/50 mr-4"></div>
//                   <h3 className="text-sm font-light tracking-wider uppercase">Activity</h3>
//                 </div>
//                 <div className="h-64 w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={analyticsData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                       <XAxis dataKey="timestamp" tick={{ fill: 'white', fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
//                       <YAxis tick={{ fill: 'white', fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: 'rgba(0, 0, 0, 0.85)',
//                           borderRadius: '0',
//                           padding: '10px',
//                           color: '#FFFFFF',
//                           border: '1px solid rgba(255, 255, 255, 0.1)'
//                         }}
//                       />
//                       <Bar dataKey="value" fill="#FFFFFF" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             ) : (
//               <div className="py-12 text-center text-white/50">
//                 <p className="uppercase tracking-wider text-sm">No analytics data available</p>
//               </div>
//             )}

//             {/* Threshold Update */}
//             <div className="mt-10">
//               <div className="flex items-center mb-8">
//                 <div className="w-8 h-px bg-white/50 mr-4"></div>
//                 <h3 className="text-sm font-light tracking-wider uppercase">Update Threshold</h3>
//               </div>
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder="New Threshold"
//                   value={newThreshold}
//                   onChange={(e) => setNewThreshold(e.target.value)}
//                   className="flex-1 p-4 bg-transparent border border-white/20 focus:border-white/50 outline-none transition-all duration-300"
//                 />
//                 <button
//                   onClick={handleThresholdUpdate}
//                   className="group relative overflow-hidden border border-white px-8 flex items-center justify-center"
//                 >
//                   <span className="absolute inset-0 bg-white transform translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
//                   <span className="relative text-white text-sm tracking-widest font-light transition-colors duration-300 group-hover:text-black uppercase">
//                     Update
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full py-32">
//             <p className="text-lg font-light tracking-wider uppercase text-white/30 mb-6">Select a device</p>
//             <div className="w-16 h-px bg-white/10 mb-6"></div>
//             <p className="text-sm font-light text-white/30 max-w-sm text-center">
//               Choose a device from the left panel to view analytics and performance data
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default GetDeviceAnalytics;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Thermometer, Droplet, Cpu, Sun } from 'react-feather';

const deviceMap = {
  1: { name: "Temperature Sensor", icon: <Thermometer size={20} /> },
  2: { name: "Humidity Sensor", icon: <Droplet size={20} /> },
  3: { name: "Pressure Sensor", icon: <Cpu size={20} /> },
  4: { name: "Light Sensor", icon: <Sun size={20} /> }
};

const GetDeviceAnalytics = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [interpretation, setInterpretation] = useState(null);
  const [deviceNameMap, setDeviceNameMap] = useState({});
  const [newThreshold, setNewThreshold] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:8082/api/devices/${username}`)
      .then(res => {
        setDeviceList(res.data);
        console.log('Device List:', res.data);
        // Map the devices to their names based on their device id
        const map = {};
        res.data.forEach(device => {
          const id = device.deviceid;
          const nameFromType = deviceMap[device.deviceid]?.name || "Unknown Device";
          map[device.deviceid] = nameFromType;
        });

        setDeviceNameMap(map); // Store the mapping
      })
      .catch(err => console.error('Error fetching devices:', err));
  }, [username]);

  useEffect(() => {
    console.log('Selected Device ID:', selectedDeviceId);
    if (selectedDeviceId) {
      axios.get(`http://localhost:5000/api/analytics/${selectedDeviceId}`)
        .then(res => setAnalyticsData(res.data))
        .catch(err => console.error('Error fetching analytics data:', err));

      axios.get(`http://localhost:5000/api/deviceInterpretation/${selectedDeviceId}`)
        .then(res => setInterpretation(res.data))
        .catch(err => console.error('Error fetching interpretation:', err));
    }
  }, [selectedDeviceId]);

  const handleThresholdUpdate = () => {
    axios.put(`http://localhost:8082/api/devices/update-threshold`, null, {
      params: {
        username,
        deviceId: selectedDeviceId,
        newThreshold
      }
    }).then(() => {
      alert('Threshold updated!');
      setNewThreshold('');
    }).catch(err => console.error('Error updating threshold:', err));
  };

  const renderPieChart = () => {
    // Monochromatic palette with better contrast
    const MONO_COLORS = [
      '#FFFFFF', '#E0E0E0', '#BDBDBD', '#9E9E9E',
      '#757575', '#616161', '#424242', '#212121'
    ];
  
    const pieData = deviceList.map(d => ({
      name: deviceMap[d.deviceid]?.name || 'Unknown',
      value: 1
    }));
  
    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            color="#00000"
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={70}
            paddingAngle={1}
            stroke="#000"
            strokeWidth={0.5}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={MONO_COLORS[index % MONO_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              borderRadius: '0',
              padding: '10px',
              color: '#FFFFFF',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            labelStyle={{ color: '#FFFFFF' }}
            itemStyle={{ color: '#FFFFFF' }}
            formatter={(value, name) => [
              `${name}`, 
              `${value} device${value !== 1 ? 's' : ''}`
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  const handleDeviceSelect = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  return (
<div className="min-h-screen bg-black text-white">
  {/* Page title */}
  <div className="relative pt-8 pb-6 px-4 md:px-8">
    <div className="w-16 h-px bg-white/20 mb-2"></div>
    <h1 className="text-2xl md:text-4xl font-light tracking-wide">DEVICE ANALYTICS</h1>
  </div>

  <div className="px-4 md:px-8 pb-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Sidebar: Pie Chart first, then Devices */}
      <div className="border border-white/10 p-6 rounded-lg">
        {/* Pie Chart Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-px bg-white/50 mr-2"></div>
            <h3 className="text-xs md:text-sm font-light tracking-wider uppercase">Distribution</h3>
          </div>
          {deviceList.length > 0 ? renderPieChart() : (
            <div className="text-sm text-white/50">No data for pie chart</div>
          )}
        </div>

        {/* Devices List */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-px bg-white mr-2"></div>
            <h2 className="text-sm md:text-xl font-light tracking-wider uppercase">Devices</h2>
          </div>

          {deviceList.length > 0 ? (
            <div className="space-y-4">
              {deviceList.map((device, index) => {
                const deviceidd = device.deviceid;
                const devType = device.devicetype;
                const icon = deviceMap[devType]?.icon;
                const name = deviceMap[deviceidd]?.name || 'Unknown Device';
                const threshold = device.threshold;

                return (
                  <button
                    key={index}
                    onClick={() => handleDeviceSelect(device.deviceid)}
                    className={`flex items-center w-full px-4 py-4 group transition-all duration-300 border border-transparent hover:border-white/30 ${selectedDeviceId === device.deviceid ? 'border-white/30 bg-white/5' : ''}`}
                  >
                    <div className="mr-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="uppercase tracking-wider text-xs font-light">{name}</div>
                      <div className="opacity-50 text-xs mt-1">Threshold: {threshold}</div>
                    </div>
                    <div className="h-px w-4 bg-white/30 transform transition-all duration-300 group-hover:w-6"></div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-white/50">
              <p className="uppercase tracking-wider text-xs">No devices found</p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="border border-white/10 p-6 rounded-lg">
        {selectedDeviceId ? (
          <>
            <div className="flex items-center mb-8">
              <div className="w-8 h-px bg-white mr-2"></div>
              <h2 className="text-lg font-light tracking-wider uppercase">
                {deviceMap[selectedDeviceId]?.name || 'Unknown Device'}
              </h2>
            </div>

            {/* Data Cards */}
            {interpretation && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Min Value</p>
                  <p className="text-xl font-light">{interpretation.minValue}</p>
                </div>
                <div className="border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Max Value</p>
                  <p className="text-xl font-light">{interpretation.maxValue}</p>
                </div>
                <div className="border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Average</p>
                  <p className="text-xl font-light">{interpretation.averageValue}</p>
                </div>
                <div className="border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-50">Latest</p>
                  <p className="text-xl font-light">{interpretation.latestValue}</p>
                </div>
              </div>
            )}

            {/* Bar Chart */}
            {analyticsData.length > 0 ? (
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-px bg-white/50 mr-2"></div>
                  <h3 className="text-sm font-light tracking-wider uppercase">Activity</h3>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="timestamp" tick={{ fill: 'white', fontSize: 10 }} stroke="rgba(255,255,255,0.3)" />
                      <YAxis tick={{ fill: 'white', fontSize: 10 }} stroke="rgba(255,255,255,0.3)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                          borderRadius: '0',
                          padding: '10px',
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                      <Bar dataKey="value" fill="#FFFFFF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-white/50">
                <p className="uppercase tracking-wider text-xs">No analytics data available</p>
              </div>
            )}

            {/* Threshold Update */}
            <div className="mt-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-px bg-white/50 mr-2"></div>
                <h3 className="text-sm font-light tracking-wider uppercase">Update Threshold</h3>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="New Threshold"
                  value={newThreshold}
                  onChange={(e) => setNewThreshold(e.target.value)}
                  className="flex-1 p-4 bg-transparent border border-white/20 focus:border-white/50 outline-none transition-all duration-300"
                />
                <button
                  onClick={handleThresholdUpdate}
                  className="group relative overflow-hidden border border-white px-6 py-2 flex items-center justify-center"
                >
                  <span className="absolute inset-0 bg-white transform translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                  <span className="relative text-white text-xs tracking-widest font-light transition-colors duration-300 group-hover:text-black uppercase">
                    Update
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16">
            <p className="text-lg font-light tracking-wider uppercase text-white/30 mb-4">Select a device</p>
            <div className="w-16 h-px bg-white/10 mb-4"></div>
            <p className="text-xs font-light text-white/30 max-w-sm text-center">
              Choose a device from the left panel to view analytics and performance data
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


  );
};  

export default GetDeviceAnalytics;