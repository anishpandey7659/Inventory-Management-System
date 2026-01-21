import React, { useState ,useEffect} from 'react';
import AddProductModal from './Addproduct';
import { getProducts, deleteProduct } from '../Apiservice';
import { FilterModal,buildFilterParams,ActionMenu } from './Func';
import { useFetch } from '../UseHook';
import { useCategories } from '../UseHook';


const InventoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilteropen, setIsFilteropen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);
  const [search, setsearch] = useState({});
  const { data: categories, loading, error } = useCategories();
  const [Products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    stock_status: '',
    category: [],
    min_price: '',
    max_price: '',
    min_quantity:'',
    max_quantity:'',
    quantity_range: '',
    ordering: '',
  });
const handleDelete = async (itemId) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    try {
      await deleteProduct(itemId);
      // Refresh the inventory after deletion
      fetchInventory(currentPage);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  }
};
const handleEdit = (itemId) => {
  console.log('Edit item:', itemId);
  // Add your edit logic here
  // Example: Open edit modal with item data
};

   useEffect(() => {
    fetchInventory(currentPage);
    }, [currentPage]);

  const fetchInventory = async (page) => {
        try {
        const response = await getProducts({ search }, page);
        
        setTotalCount(response.data.count);
        const data = response.data.results || response.data;

        const mappedData = data.map(item => ({
            id: item.id,
            name: item.product_name,
            sku: item.sku,
            category: item.category?.name || "Unknown",
            Sp: item.selling_price,
            Pp: item.purchase_price,
            quantity: item.quantity,
            status: item.quantity === 0 ? "Out of Stock" : item.quantity < 15 ? "Low Stock" : "In Stock"
        }));

        setInventoryData(mappedData);
        } catch (error) {
         console.log(error.response?.data || error.message);
        }
    };

const defaultFilters = {
  stock_status: '',
  category: [],
  min_price: '',
  max_price: '',
  min_quantity: '',
  max_quantity: '',
  quantity_range: '',
  ordering: '',
};

const clearFilters = () => {
  setFilters(defaultFilters);
  setCurrentPage(1);
  fetchInventory(1); // fetch normal data
};



  const handleFilterApply = async (incomingFilters) => {
    const params = buildFilterParams(incomingFilters);

    try {
      const response = await getProducts(params);

      const data = response.data.results || response.data;

      const mappedData = data.map(item => ({
        id: item.id,
        name: item.product_name,
        sku: item.sku,
        category: item.category?.name || "Unknown",
        Sp: item.selling_price,
        Pp: item.purchase_price,

        quantity: item.quantity,
        status:
          item.quantity === 0
            ? "Out of Stock"
            : item.quantity < 15
              ? "Low Stock"
              : "In Stock",
      }));

      setInventoryData(mappedData);
      setTotalCount(response.data.count);
      setCurrentPage(1);  // reset page to 1
      console.log("Filter params:", params);
    } catch (error) {
      console.log("Filter params:", params);
      console.log("Error:", error);
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
          <button onClick={()=>setIsFilteropen(true)} style={{
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
          <FilterModal
          isOpen={isFilteropen} onClose={()=>setIsFilteropen(false)}
          categories={categories} onApplyFilter={handleFilterApply}
      
          />
          <button onClick={clearFilters} style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',  
          }}>
            Clear Filters
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
        isOpen={isModalOpen} head="Add New Product"
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
              }}>
                Selling Price</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Purchase Price</th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                
                QUANTITY</th>
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
                }}>${item.Sp}</td>
                
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: '#1f2937',
                  fontWeight: '500'
                }}>${item.Pp}</td>
                
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
                <ActionMenu 
                  itemId={item.id}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
            {[...Array(totalPages || 0)].map((_, index) => {
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