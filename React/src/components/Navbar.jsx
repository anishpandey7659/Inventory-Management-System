import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Inventory', icon: '📦' },
    { name: 'Orders', icon: '🛒' },
    { name: 'Reports', icon: '📄' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '0',
        height: '100vh',
        background: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: sidebarOpen ? '20px 0' : '0',
        transition: 'all 0.3s',
        overflow: 'hidden'
      }}>
        
        {/* Top Section */}
        <div>
          {/* Logo/Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0 24px',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '36px',
              height: '30px',
              background: '#3b82f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📦
            </div>
            <h2 style={{
              color: 'white',
              margin: 0,
              fontSize: '22px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>INVENTO</h2>
          </div>

          {/* Menu Items */}
          <nav style={{ padding: '0 10px' }}>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  marginBottom: '8px',
                  background: activeItem === item.name ? '#334155' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: activeItem === item.name ? '#60a5fa' : '#94a3b8',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== item.name) {
                    e.currentTarget.style.background = '#2d3748';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== item.name) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section - Logout */}
        <div style={{ padding: '0 16px' }}>
          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            background: 'transparent',
            border: 'none',
            borderRadius: '10px',
            color: '#94a3b8',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2d3748';
            e.currentTarget.style.color = '#f87171';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}
          >
            <span style={{ fontSize: '20px' }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Navbar */}
        <nav style={{
          background: '#f4f1f1',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          borderBottom: '1px solid #e5e7eb',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px'
          }}>
            
            {/* Left Section - Menu & Dashboard Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1f2937',
                  padding: '8px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '24px' }}>☰</span>
              </button>
              <h2 style={{ 
                color: '#1f2937', 
                margin: 0,
                fontSize: '28px',
                fontWeight: '600'
              }}>Dashboard</h2>
            </div>

            {/* Right Section - Search, Notification & Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '18px'
                }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: '320px',
                    padding: '10px 16px 10px 42px',
                    borderRadius: '20px',
                    border: '1px solid #e5e7eb',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#6b7280',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid #3b82f6'}
                  onBlur={(e) => e.target.style.border = '1px solid #e5e7eb'}
                />
              </div>

              {/* Notification Button */}
              <button style={{
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                padding: '8px',
                cursor: 'pointer',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '18px' }}>🔔</span>
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}></span>
              </button>

              {/* Profile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '9px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#0ea5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px'
                }}>
                  AU
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ 
                    color: '#1f2937', 
                    margin: 0, 
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>Admin User</p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          background: '#f9fafb',
          padding: '1px'
        }}>
          {children || (
            <div>
              <h3 style={{ color: '#1f2937', fontSize: '20px', marginBottom: '16px' }}>
                Welcome to Dashboard
              </h3>
              <p style={{ color: '#6b7280' }}>
                Your content goes here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;