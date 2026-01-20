import React, { useState ,useEffect} from 'react';
import AddProductModal from './Addproduct';
import { getProducts, deleteProduct } from '../Apiservice';
import { FilterModal } from './Func';

const InventoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);
  const [filters, setFilters] = useState({});
  const [search, setsearch] = useState({});


  
   useEffect(() => {
    fetchInventory(currentPage);
    }, [currentPage]);

  const fetchInventory = async (page) => {
        try {
        const response = await getProducts(filters, page, pageSize, search);
        
        setTotalCount(response.data.count);
        const data = response.data.results || response.data;

        const mappedData = data.map(item => ({
            id: item.id,
            name: item.product_name,
            sku: item.sku,
            category: item.category?.name || "Unknown",
            price: item.selling_price,
            quantity: item.quantity,
            status: item.quantity === 0 ? "Out of Stock" : item.quantity < 15 ? "Low Stock" : "In Stock"
        }));

        setInventoryData(mappedData);
        } catch (error) {
         console.log(error.response?.data || error.message);
        }
    };
    


  const getStatusColor = (status) => {
    if (status === 'In Stock') return '#10b981';
    if (status === 'Low Stock') return '#f59e0b';
    if (status === 'Out of Stock') return '#ef4444';
    return '#6b7280';
  };

  const getQuantityColor = (quantity) => {
    if (quantity === 0) return '#ef4444';
    if (quantity < 15) return '#f59e0b';
    return '#1f2937';
  };

  return (
    <div style={{ padding: '14px', background: '#f9fafb', minHeight: '100vh' }}>
      
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px'
      }}>
        
        {/* Search Box */}
        <div style={{ position: 'relative', width: '400px' }}>
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              outline: 'none',
              fontSize: '14px',
              background: 'white'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div  style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🔽</span>
            Filter
          </button>
          
          <button  onClick={() => setIsModalOpen(true)}
           style={{
            padding: '10px 20px',
            background: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '16px' }}>+</span>
            Add Product
          </button>
          <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
        </div>
      </div>

      {/* Table Container */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        
        {/* Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          
          {/* Table Header */}
          <thead>
            <tr style={{  background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>PRODUCT NAME</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>SKU</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>CATEGORY</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>PRICE</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>QUANTITY</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>STATUS</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={item.id} style={{
                borderBottom: '1px solid #e5e7eb',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: '#1f2937',
                  fontWeight: '500'
                }}>{item.name}</td>
                
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>{item.sku}</td>
                
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#4b5563'
                  }}>{item.category}</span>
                </td>
                
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: '#1f2937',
                  fontWeight: '500'
                }}>${item.price}</td>
                
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: getQuantityColor(item.quantity),
                  fontWeight: item.quantity < 15 ? '600' : '400'
                }}>{item.quantity}</td>
                
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: getStatusColor(item.status),
                    fontWeight: '500'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: getStatusColor(item.status)
                    }}></span>
                    {item.status}
                  </span>
                </td>
                
                <td style={{ padding: '16px 24px' }}>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6b7280',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '4px 8px'
                  }}>⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb'
          }}>
          <span style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>Showing {start} – {end} of {totalCount} entries</span>

          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Prev */}
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              color: '#6b7280',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Prev
            </button>
            
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: '8px 16px',
                    background: currentPage === page ? '#3b82f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    color: currentPage === page ? 'white' : '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              );
            })}
            
          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              color: '#6b7280',
              fontSize: '14px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Next
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;