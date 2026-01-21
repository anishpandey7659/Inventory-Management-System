import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Inventory', icon: '📦' },
    { name: 'Orders', icon: '🛒' },
    { name: 'Reports', icon: '📄' },
    { name: 'Chatbot', icon: '🤖' }
  ];

return (
  <div className="flex h-screen overflow-hidden">
    
    {/* Sidebar */}
    <div 
      className={`h-screen bg-slate-800 flex flex-col justify-between transition-all duration-300 overflow-hidden ${
        sidebarOpen ? 'w-[250px] px-0 py-5' : 'w-0 p-0'
      }`}
    >
      
      {/* Top Section */}
      <div>
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-9 h-[30px] bg-blue-500 rounded-lg flex items-center justify-center text-xl">
            📦
          </div>
          <h2 className="text-white m-0 text-[22px] font-bold tracking-wide">
            INVENTO
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="px-2.5">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3.5 py-3.5 px-4 mb-2 border-none rounded-[10px] text-base font-medium cursor-pointer transition-all duration-200 text-left ${
                activeItem === item.name
                  ? 'bg-slate-700 text-blue-400'
                  : 'bg-transparent text-slate-400 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div className="px-4">
        <button 
          className="w-full flex items-center gap-3.5 py-3.5 px-4 bg-transparent border-none rounded-[10px] text-slate-400 text-base font-medium cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:text-red-400"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col overflow-hidden">
      
      {/* Navbar */}
      <nav className="bg-[#f4f1f1] shadow-sm border-b border-gray-200 z-10">
        <div className="flex items-center justify-between py-2.5 px-5">
          
          {/* Left Section - Menu & Dashboard Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-transparent border-none text-gray-800 p-2 cursor-pointer rounded-lg flex items-center hover:bg-gray-200"
            >
              <span className="text-2xl">☰</span>
            </button>
            <h2 className="text-gray-800 m-0 text-[28px] font-semibold">
              Dashboard
            </h2>
          </div>

          {/* Right Section - Search, Notification & Profile */}
          <div className="flex items-center gap-5">
            
            {/* Search Bar */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-80 py-2.5 px-5 pl-[42px] rounded-[20px] border border-gray-200 outline-none text-sm text-gray-500 bg-gray-50 focus:border-blue-500"
              />
            </div>

            {/* Notification Button */}
            <button className="bg-transparent border-none text-gray-500 p-2 cursor-pointer rounded-lg relative flex items-center justify-center hover:bg-gray-100">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile */}
            <div 
              className="flex items-center gap-3 cursor-pointer py-1.5 px-3 rounded-[9px] transition-colors hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold text-[15px]">
                AU
              </div>
              <div className="text-left">
                <p className="text-gray-800 m-0 text-[15px] font-medium">
                  Admin User
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-px">
        {children || (
          <div>
            <h3 className="text-gray-800 text-xl mb-4">
              Welcome to Dashboard
            </h3>
            <p className="text-gray-500">
              Your content goes here...
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
export default Layout;