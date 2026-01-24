import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, FileText, Package, Users, ShoppingCart, AlertCircle } from 'lucide-react';
import { getsales,total_revenue } from '../Apiservice';


let Total_Revenue=total_revenue.data.total_revenue
const Dashboard = () => {
  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 4200, invoices: 12 },
    { month: 'Feb', revenue: 3800, invoices: 10 },
    { month: 'Mar', revenue: 5100, invoices: 15 },
    { month: 'Apr', revenue: 4600, invoices: 13 },
    { month: 'May', revenue: 5400, invoices: 16 },
    { month: 'Jun', revenue: 5389.95, invoices: 18 }
  ];

  // Invoice status data
  const invoiceStatusData = [
    { name: 'Paid', value: 3839.96, count: 3 },
    { name: 'Pending', value: 1549.99, count: 2 }
  ];

  // Top customers
  const topCustomers = [
    { name: 'Alex Morgan', amount: 1850.50, invoices: 4 },
    { name: 'Sarah Connor', amount: 1250.00, invoices: 3 },
    { name: 'John Smith', amount: 980.75, invoices: 2 },
    { name: 'Emma Wilson', amount: 759.70, invoices: 2 }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: 'payment', customer: 'Alex Morgan', action: 'Payment received', amount: 459.97, time: '2 hours ago' },
    { id: 2, type: 'invoice', customer: 'Sarah Connor', action: 'Invoice created', amount: 1250.00, time: '5 hours ago' },
    { id: 3, type: 'inventory', customer: 'System', action: 'Low stock alert: Product ABC', amount: null, time: '1 day ago' },
    { id: 4, type: 'payment', customer: 'John Smith', action: 'Payment received', amount: 320.50, time: '2 days ago' }
  ];

  const COLORS = ['#10b981', '#f59e0b'];

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={ Total_Revenue}
            icon={DollarSign}
            trend="up"
            trendValue="12.5%"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Total Invoices"
            value="5"
            icon={FileText}
            trend="up"
            trendValue="8.3%"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <StatCard
            title="Active Customers"
            value="24"
            icon={Users}
            trend="up"
            trendValue="5.2%"
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Inventory Items"
            value="156"
            icon={Package}
            trend="down"
            trendValue="2.1%"
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>This year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Invoice Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Invoice Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {invoiceStatusData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Customers</h2>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.invoices} invoices</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${customer.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const getActivityIcon = () => {
                  switch(activity.type) {
                    case 'payment': return <DollarSign className="w-5 h-5 text-green-600" />;
                    case 'invoice': return <FileText className="w-5 h-5 text-blue-600" />;
                    case 'inventory': return <AlertCircle className="w-5 h-5 text-orange-600" />;
                    default: return <ShoppingCart className="w-5 h-5 text-gray-600" />;
                  }
                };

                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="mt-1">{getActivityIcon()}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.customer}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-semibold text-gray-900">
                        ${activity.amount.toFixed(2)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;