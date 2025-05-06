import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home, 
  Thermometer, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  Activity,
  Cpu,
  AlertTriangle,
  UserCircle
} from 'lucide-react';

const SidePanel = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'HOME', icon: <Home size={18} /> },
  { path: '/dashboard/get-analytics', label: 'GET ANALYTICS', icon: <BarChart3 size={18} />  },
    { path: '/dashboard/select-device', label: 'SELECT DEVICE', icon: <Cpu size={18} /> }
  ];

  return (
    <div
      className={`min-h-screen bg-black flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 border-r border-white/10 relative overflow-y-auto`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white/10 flex items-center justify-center">
              <span className="text-white font-light">N</span>
            </div>
            <div className="ml-4 w-8 h-px bg-white/20"></div>
            <h1 className="ml-4 text-white font-light tracking-wider text-sm">NEXORA</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight
            size={18}
            className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <div className="mt-12 flex flex-col space-y-4 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-2' : 'px-4'
            } py-3 transition-all duration-300 group border border-transparent ${
              isActive(item.path)
                ? 'border-white/30 bg-white/5'
                : 'hover:border-white/20'
            }`}
          >
            <span className={`text-white/60 group-hover:text-white/100 ${isActive(item.path) ? 'text-white' : ''}`}>
              {item.icon}
            </span>

            {!isCollapsed && (
              <>
                <div className="ml-4 w-4 h-px bg-white/30"></div>
                <span className={`ml-4 text-xs font-light tracking-wider ${
                  isActive(item.path) ? 'text-white' : 'text-white/60 group-hover:text-white/100'
                }`}>
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom Profile Section */}
      <div className="mt-auto mb-6 px-4">
        <div className={`flex ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-4 border border-white/10 hover:border-white/20 transition-all duration-300`}>
          <UserCircle size={20} className="text-white/70" />
          {!isCollapsed && (
            <>
              <div className="ml-4 w-4 h-px bg-white/20"></div>
              <div className="ml-4">
                <p className="uppercase text-white/80 text-xs tracking-wider font-light">Beta Account</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
