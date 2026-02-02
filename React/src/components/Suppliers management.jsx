import React, { useState,useEffect } from 'react';
import { Search, Plus, Phone, Mail, MapPin, Package, DollarSign, TrendingUp, Clock, Star, Edit2, Trash2, Eye, ShoppingCart, Calendar, FileText, Award, AlertCircle } from 'lucide-react';
import { CreateSupplierModal } from './Subpage/CreateSupplier';
import { getSuppliers } from '../Apiservice';

const SuppliersManagement = () => {
  const [showCreateSupplier, setShowCreateSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'TechDistributors Inc',
      contactPerson: 'Michael Chen',
      email: 'michael@techdist.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Park, San Francisco, CA 94105',
      status: 'active',
      productsSupplied: ['Apple', 'Macbook', 'Earphone'],
      paymentTerms: 'Net 30',
      leadTime: 14,
      totalOrders: 45,
      totalPurchases: 245000,
      lastOrderDate: '2026-01-25',
      rating: 4.8,
      onTimeDelivery: 95,
      qualityRating: 4.9,
      outstandingPayment: 12500
    },
    {
      id: 2,
      name: 'Office Supplies Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@officesupplies.com',
      phone: '+1 (555) 234-5678',
      address: '456 Commerce St, New York, NY 10013',
      status: 'active',
      productsSupplied: ['pencil', 'Notebook'],
      paymentTerms: 'Net 15',
      leadTime: 5,
      totalOrders: 78,
      totalPurchases: 45600,
      lastOrderDate: '2026-01-26',
      rating: 4.5,
      onTimeDelivery: 92,
      qualityRating: 4.6,
      outstandingPayment: 3200
    },
    {
      id: 3,
      name: 'Fashion Warehouse Ltd',
      contactPerson: 'David Martinez',
      email: 'david@fashionwarehouse.com',
      phone: '+1 (555) 345-6789',
      address: '789 Fashion Ave, Los Angeles, CA 90015',
      status: 'active',
      productsSupplied: ['Shoes'],
      paymentTerms: 'Net 45',
      leadTime: 10,
      totalOrders: 32,
      totalPurchases: 156000,
      lastOrderDate: '2026-01-20',
      rating: 4.3,
      onTimeDelivery: 88,
      qualityRating: 4.4,
      outstandingPayment: 8900
    },
    {
      id: 4,
      name: 'ElectroHub Wholesale',
      contactPerson: 'Emily Wong',
      email: 'emily@electrohub.com',
      phone: '+1 (555) 456-7890',
      address: '321 Electronics Blvd, Austin, TX 78701',
      status: 'active',
      productsSupplied: ['Earphone', 'Apple'],
      paymentTerms: 'Net 30',
      leadTime: 12,
      totalOrders: 28,
      totalPurchases: 89000,
      lastOrderDate: '2026-01-22',
      rating: 4.7,
      onTimeDelivery: 94,
      qualityRating: 4.8,
      outstandingPayment: 5600
    },
    {
      id: 5,
      name: 'Global Tech Supply',
      contactPerson: 'Robert Kim',
      email: 'robert@globaltechsupply.com',
      phone: '+1 (555) 567-8901',
      address: '654 Innovation Dr, Seattle, WA 98101',
      status: 'inactive',
      productsSupplied: ['Macbook', 'Notebook'],
      paymentTerms: 'Net 60',
      leadTime: 21,
      totalOrders: 12,
      totalPurchases: 178000,
      lastOrderDate: '2025-11-15',
      rating: 3.8,
      onTimeDelivery: 75,
      qualityRating: 3.9,
      outstandingPayment: 0
    }
  ]);

  useEffect(()=>{
    const fetchSupplier =async()=>{
      try{
        const response =await getSuppliers();
        console.log(response.data)
      }catch(err){
        console.log(err.data);
      }
    }
    fetchSupplier();

  },[]
  )

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const totalPurchases = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
  const avgRating = (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1);
  const totalOutstanding = suppliers.reduce((sum, s) => sum + s.outstandingPayment, 0);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-emerald-500 bg-emerald-500';
    if (rating >= 4.0) return 'text-blue-500 bg-blue-500';
    if (rating >= 3.5) return 'text-amber-500 bg-amber-500';
    return 'text-red-500 bg-red-500';
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? { bg: 'bg-emerald-100', color: 'text-emerald-700', label: 'Active' }
      : { bg: 'bg-red-100', color: 'text-red-700', label: 'Inactive' };
  };

  const statCards = [
    { label: 'Active Suppliers', value: activeSuppliers, icon: Package, color: 'text-emerald-500', bgColor: 'bg-emerald-500', subtext: `${suppliers.length} total` },
    { label: 'Total Purchases', value: `$${(totalPurchases / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-blue-500', bgColor: 'bg-blue-500', subtext: 'All time' },
    { label: 'Average Rating', value: avgRating, icon: Star, color: 'text-amber-500', bgColor: 'bg-amber-500', subtext: 'Out of 5.0' },
    { label: 'Outstanding Payments', value: `$${(totalOutstanding / 1000).toFixed(1)}K`, icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-500', subtext: 'Pending' }
  ];
  const handleCreateSupplier =(e)=>{
    setShowCreateSupplier(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-10 py-5 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-1">
              Suppliers
            </h1>
            <p className="text-sm text-gray-500">
              Manage your supplier relationships and purchase orders
            </p>
          </div>
          <button 
            onClick={handleCreateSupplier}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/40"
          >
            <Plus size={18} />
            Add Supplier
          </button>
              <CreateSupplierModal
                isOpen={showCreateSupplier}
                onClose={() => setShowCreateSupplier(false)}
              />
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-10 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.subtext}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} bg-opacity-10 flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-5 mb-5 border border-gray-200 flex gap-3 items-center flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search size={18} className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search suppliers, contacts, emails..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pl-11 pr-3.5 border border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 focus:border-blue-600"
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="py-2.5 px-3.5 border border-gray-200 rounded-lg text-sm outline-none bg-white text-gray-700 cursor-pointer font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredSuppliers.map((supplier) => {
            const statusBadge = getStatusBadge(supplier.status);
            const ratingColor = getRatingColor(supplier.rating);

            return (
              <div 
                key={supplier.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {supplier.name}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Package size={13} />
                        {supplier.productsSupplied.length} products
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${statusBadge.bg} text-xs font-semibold ${statusBadge.color}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusBadge.color.replace('text-', 'bg-')}`} />
                      {statusBadge.label}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`flex items-center gap-1 px-2.5 py-1 ${ratingColor.replace('text-', 'bg-').replace('bg-', 'bg-').replace('500', '500/10')} rounded-md`}>
                      <Star size={14} className={ratingColor.split(' ')[0]} fill="currentColor" />
                      <span className={`text-sm font-bold ${ratingColor.split(' ')[0]}`}>
                        {supplier.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {supplier.onTimeDelivery}% on-time delivery
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="px-5 py-4 bg-gray-50 text-xs text-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={14} className="text-gray-500" />
                    <span>{supplier.contactPerson}</span>
                    <span className="text-gray-300">•</span>
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={14} className="text-gray-500" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{supplier.address}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 py-4 grid grid-cols-2 gap-4 border-t border-gray-100">
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1 uppercase tracking-wider">
                      Total Orders
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {supplier.totalOrders}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1 uppercase tracking-wider">
                      Total Purchases
                    </div>
                    <div className="text-xl font-bold text-emerald-500">
                      ${(supplier.totalPurchases / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1 uppercase tracking-wider">
                      Payment Terms
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {supplier.paymentTerms}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1 uppercase tracking-wider">
                      Lead Time
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {supplier.leadTime} days
                    </div>
                  </div>
                </div>

                {/* Outstanding Payment Alert */}
                {supplier.outstandingPayment > 0 && (
                  <div className="px-5 py-3 bg-amber-50 border-t border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                    <AlertCircle size={16} />
                    <span>
                      <strong>${supplier.outstandingPayment.toLocaleString()}</strong> payment pending
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-blue-700">
                    <ShoppingCart size={14} />
                    Create PO
                  </button>
                  <button className="px-2 py-2 bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-gray-50">
                    <Eye size={16} className="text-gray-600" />
                  </button>
                  <button className="px-2 py-2 bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-gray-50">
                    <Edit2 size={16} className="text-gray-600" />
                  </button>
                  <button className="px-2 py-2 bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-red-50 group">
                    <Trash2 size={16} className="text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="bg-white rounded-xl px-5 py-15 text-center border border-gray-200">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No suppliers found
            </h3>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersManagement;