import React, { useState } from 'react';
import { Search, Plus, Phone, Mail, MapPin, Package, DollarSign, TrendingUp, Clock, Star, Edit2, Trash2, Eye, ShoppingCart, Calendar, FileText, Award, AlertCircle } from 'lucide-react';

const SuppliersManagement = () => {
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
    if (rating >= 4.5) return '#10B981';
    if (rating >= 4.0) return '#3B82F6';
    if (rating >= 3.5) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? { bg: '#D1FAE5', color: '#059669', label: 'Active' }
      : { bg: '#FEE2E2', color: '#DC2626', label: 'Inactive' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
              marginBottom: '4px'
            }}>
              Suppliers
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Manage your supplier relationships and purchase orders
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '12px 24px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(37, 99, 235, 0.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1d4ed8';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(37, 99, 235, 0.3)';
            }}>
            <Plus size={18} />
            Add Supplier
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '30px 40px'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { label: 'Active Suppliers', value: activeSuppliers, icon: Package, color: '#10B981', subtext: `${suppliers.length} total` },
            { label: 'Total Purchases', value: `$${(totalPurchases / 1000).toFixed(0)}K`, icon: DollarSign, color: '#3B82F6', subtext: 'All time' },
            { label: 'Average Rating', value: avgRating, icon: Star, color: '#F59E0B', subtext: 'Out of 5.0' },
            { label: 'Outstanding Payments', value: `$${(totalOutstanding / 1000).toFixed(1)}K`, icon: AlertCircle, color: '#EF4444', subtext: 'Pending' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginBottom: '8px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: stat.color,
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    {stat.subtext}
                  </div>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: '1',
            minWidth: '300px',
            position: 'relative'
          }}>
            <Search size={18} color="#9ca3af" style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <input
              type="text"
              placeholder="Search suppliers, contacts, emails..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#2563eb'}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 14px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              background: 'white',
              color: '#374151',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Suppliers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '20px'
        }}>
          {filteredSuppliers.map((supplier) => {
            const statusBadge = getStatusBadge(supplier.status);
            const ratingColor = getRatingColor(supplier.rating);

            return (
              <div key={supplier.id} style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Card Header */}
                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        {supplier.name}
                      </h3>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Package size={13} />
                        {supplier.productsSupplied.length} products
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: statusBadge.bg,
                      fontSize: '12px',
                      fontWeight: '600',
                      color: statusBadge.color
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: statusBadge.color
                      }} />
                      {statusBadge.label}
                    </div>
                  </div>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      background: `${ratingColor}15`,
                      borderRadius: '6px'
                    }}>
                      <Star size={14} fill={ratingColor} color={ratingColor} />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: ratingColor
                      }}>
                        {supplier.rating}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {supplier.onTimeDelivery}% on-time delivery
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{
                  padding: '16px 20px',
                  background: '#f9fafb',
                  fontSize: '13px',
                  color: '#6b7280'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <Phone size={14} color="#6b7280" />
                    <span>{supplier.contactPerson}</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <span>{supplier.phone}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <Mail size={14} color="#6b7280" />
                    <span>{supplier.email}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <MapPin size={14} color="#6b7280" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ lineHeight: '1.4' }}>{supplier.address}</span>
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Total Orders
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {supplier.totalOrders}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Total Purchases
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#10B981'
                    }}>
                      ${(supplier.totalPurchases / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Payment Terms
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#6b7280'
                    }}>
                      {supplier.paymentTerms}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Lead Time
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#6b7280'
                    }}>
                      {supplier.leadTime} days
                    </div>
                  </div>
                </div>

                {/* Outstanding Payment Alert */}
                {supplier.outstandingPayment > 0 && (
                  <div style={{
                    padding: '12px 20px',
                    background: '#FEF3C7',
                    borderTop: '1px solid #FDE68A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#92400E'
                  }}>
                    <AlertCircle size={16} />
                    <span>
                      <strong>${supplier.outstandingPayment.toLocaleString()}</strong> payment pending
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid #f3f4f6',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button style={{
                    flex: 1,
                    padding: '8px 16px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                    <ShoppingCart size={14} />
                    Create PO
                  </button>
                  <button style={iconButtonStyle}
                    onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <Eye size={16} color="#6b7280" />
                  </button>
                  <button style={iconButtonStyle}
                    onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    <Edit2 size={16} color="#6b7280" />
                  </button>
                  <button style={iconButtonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#FEE2E2';
                      e.currentTarget.querySelector('svg').style.color = '#DC2626';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.querySelector('svg').style.color = '#6b7280';
                    }}>
                    <Trash2 size={16} color="#6b7280" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <Package size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#6b7280',
              margin: 0,
              marginBottom: '8px'
            }}>
              No suppliers found
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: 0
            }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const iconButtonStyle = {
  padding: '8px',
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
};

export default SuppliersManagement;