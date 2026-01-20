import { useFetch } from "../UseHook";
import { createProduct } from "../Apiservice";
import { useState } from "react";
import { getCategories,getSuppliers } from "../Apiservice";
import { createCategory,createSupplier } from "../Apiservice";
import { usePost } from "../UseHook";

export const  CreateCategoryModal = ({ isOpen, onClose}) => {
  const { loading, error, success, postData } = usePost(createCategory);
  const [cat,setcat]=useState('')
  const [slug,setslug]=useState('')
  const [errormsg, setErrorMsg] = useState('');
  const [sucessmsg,setsuccessMsg] =useState('')


  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setcat(value);
    if (!slug || slug === generateSlug(cat)) {
      setslug(generateSlug(value));
    }
  };

const handleSave = async (e) => {
    e.preventDefault();

    if (!cat.trim()) {
      setErrorMsg("Category name is required");
      return;
    }

    const catdata = {
      name: cat,
      slug: slug || generateSlug(cat),
    };

    try {
      const response = await postData(catdata);
      console.log("Success:", response);

      if (response) {
        setsuccessMsg("Successfully created!");
        setcat("");
        setslug("");
        onClose();

        setTimeout(() => setsuccessMsg(""), 2000);
      }
    } catch (err) {
      setErrorMsg("Failed to create category");
      console.log("Error:", err.response.data);
    }
  };

  if (!isOpen) return null;

  return (
  <div
    style={{position: "fixed",top: 0,left: 0,right: 0,bottom: 0,background: "rgba(0, 0, 0, 0.55)",display: "flex",alignItems: "center",justifyContent: "center",zIndex: 2000,}}
  >
    <div
      style={{background: "white",borderRadius: "14px",width: "90%",maxWidth: "520px",boxShadow: "0 25px 60px rgba(0, 0, 0, 0.18)",overflow: "hidden",}}
    >
      <form onSubmit={handleSave}>
        <div
          style={{  padding: "22px 24px",borderBottom: "1px solid #e5e7eb",display: "flex",justifyContent: "space-between",alignItems: "center",gap: "12px",}}
        >
          <h3
            style={{margin: 0,fontSize: "20px",fontWeight: "650",color: "#1f2937",}}
          >
            Create New Category
          </h3>

          <button
            type="button"
            title="Close"
            onClick={() => {onClose();setcat("");setslug("");setErrorMsg("");}}
            style={{background: "transparent",border: "none",fontSize: "26px",color: "#111827",cursor: "pointer",padding: "0 6px",lineHeight: 1,}}
          >×
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {errormsg && (
            <div
              style={{background: "#fff1f2",border: "1px solid #fecaca",color: "#b91c1c",
                padding: "10px 14px",borderRadius: "10px",marginBottom: "16px",fontSize: "14px",
              }}
            >
              ❌ {errormsg}
            </div>
          )}
          {sucessmsg && (
            <div
              style={{background: "#fff1f2",border: "1px solid #fecaca",color: "#b91c1c",
                padding: "10px 14px",borderRadius: "10px",marginBottom: "16px",fontSize: "14px",
              }}
            >
              ❌ {sucessmsg}
            </div>
          )}

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{display: "block",fontSize: "14px",fontWeight: "600",color: "#374151",marginBottom: "8px",}}
            >
              Category Name *
            </label>
            <input
              type="text"
              value={cat}
              onChange={handleNameChange}
              placeholder="e.g., Electronics"
              style={{width: "100%",padding: "12px 14px",border: "1px solid #d1d5db",borderRadius: "10px",fontSize: "14px",outline: "none",transition: "0.2s",}}
              onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{display: "block",fontSize: "14px",fontWeight: "600",color: "#374151",marginBottom: "8px",}}
            >
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setslug(e.target.value)}
              placeholder="auto-generated-slug"
              style={{width: "100%",padding: "12px 14px",border: "1px solid #d1d5db",borderRadius: "10px",fontSize: "14px",outline: "none",background: "#f9fafb",transition: "0.2s",}}
              onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
            <p style={{fontSize: "12px",color: "#6b7280",margin: "6px 0 0 0",}}>
              Auto-generated from name, or customize
            </p>
          </div>

          <div
            style={{display: "flex",justifyContent: "flex-end",gap: "12px",}}
          >
            <button
              type="button"
              onClick={() => {
                onClose();
                setcat("");
                setslug("");
                setErrorMsg("");
              }}
              style={{
                padding: "10px 22px",background: "white",border: "1px solid #d1d5db",borderRadius: "10px",color: "#374151",fontSize: "14px",
                fontWeight: "600",cursor: "pointer",transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{padding: "10px 22px",background: "#10b981",border: "none",borderRadius: "10px",color: "white",fontSize: "14px",fontWeight: "600",cursor: "pointer",transition: "0.2s",}}
              onMouseEnter={(e) => (e.target.style.background = "#0f9a70")}
              onMouseLeave={(e) => (e.target.style.background = "#10b981")}
            >
              Create Category
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

};

export const CreateSupplierModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const { loading: postLoading, error: postError, success, postData } = usePost(createSupplier);

  const handleSave = async(e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Supplier name is required');
      return;
    }
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    const supplier_data={name:name,phone:phone,email:email,address:address}
    try{
      const response =await postData(supplier_data)
      console.log("Success:", response);
      if (response){
        setsuccessMsg("Sucessfully created");
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setError("");
        onClose();
        setTimeout(() => setsuccessMsg(""), 2000);
      }

    }catch(err){
      setError("Failed to create Supplier")
      console.log("Error:", err.response?.data || err.message);
    }
  };


  if (!isOpen) return null;

  return (
    <div style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,background: 'rgba(0, 0, 0, 0.6)',display: 'flex',alignItems: 'center',justifyContent: 'center',zIndex: 2000}}>
      <div style={{background: 'white',borderRadius: '12px',width: '90%',maxWidth: '500px',boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'}}>
        <form onSubmit={handleSave}>
          <div style={{padding: '20px 24px',borderBottom: '1px solid #e5e7eb',display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
              Create New Supplier
            </h3>
              <button
              onClick={() => {
                onClose();
                setName('');
                setPhone('');
                setEmail('');
                setAddress('');
                setError('');
              }}
              style={{
                background: 'transparent',border: 'none',fontSize: '24px',color: '#9ca3af',cursor: 'pointer',padding: '0'
              }}
              >×</button>
        </div>

        <div style={{ padding: '24px' }}>
          {error && (
            <div style={{
              background: '#fef2f2',border: '1px solid #fecaca',color: '#dc2626',padding: '10px 14px',borderRadius: '8px',marginBottom: '16px',fontSize: '14px'
            }}>
              ❌ {error}
            </div>
          )}
          {successMsg && (
            <div style={{
              background: '#fef2f2',border: '1px solid #fecaca',color: '#dc2626',padding: '10px 14px',borderRadius: '8px',marginBottom: '16px',fontSize: '14px'
            }}>
              ❌ {successMsg}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
            }}>Supplier Name *</label>
            <input
              type="text"value={name}onChange={(e) => setName(e.target.value)}placeholder="e.g., ABC Suppliers"
              style={{
                width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
            }}>Phone</label>
            <input
              type="tel"value={phone} onChange={(e) => setPhone(e.target.value)}placeholder="e.g., +1 234 567 8900"maxLength={15}
              style={{
                width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
            }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="supplier@example.com"
              style={{
                width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
            }}>Address</label>
            <textarea
              value={address} onChange={(e) => setAddress(e.target.value)}placeholder="123 Main St, City, Country"rows={3}
              style={{
                width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none',resize: 'vertical',fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{
            display: 'flex',justifyContent: 'flex-end',gap: '12px'
          }}>
            <button
              onClick={() => {
                onClose();
                setName('');
                setPhone('');
                setEmail('');
                setAddress('');
                setError('');
              }}
              style={{
                padding: '10px 20px',background: 'white',border: '1px solid #d1d5db',borderRadius: '8px',color: '#374151',fontSize: '14px',fontWeight: '500',cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',background: '#10b981',border: 'none',borderRadius: '8px',color: 'white',fontSize: '14px',fontWeight: '500',cursor: 'pointer'
              }}
            >
              Create Supplier
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

const buildQueryParams = (filters) => {
  const params = new URLSearchParams();

  if (filters.stock_status)
    params.append('stock_status', filters.stock_status);

  if (filters.category.length)
    params.append('category', filters.category.join(','));

  if (filters.min_price)
    params.append('min_price', filters.min_price);

  if (filters.max_price)
    params.append('max_price', filters.max_price);

  if (filters.quantity_range)
    params.append('quantity_range', filters.quantity_range);

  if (filters.ordering)
    params.append('ordering', filters.ordering);

  return params.toString();
};


// testfilter
import { getProducts } from "../Apiservice";

export function Testfilter() {
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

const fetchProducts = async () => {
  try {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (value === "" || value === null || value === undefined) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
    );

    const res = await getProducts(cleanFilters);
    setProducts(res.data.results);
    console.log(res.data.results);
  } catch (err) {
    console.log("Error:", err);
  }
};


  return (
    <>
      <h1>The Test version of Filter</h1>

      <h2>Min_price</h2>
      <form>
        <input
          type="number"
          placeholder="Min"
          onChange={e => setFilters({ ...filters, min_price: e.target.value })}
        />

        <h2>Max_price</h2>
        <input
          type="number"
          placeholder="Max"
          onChange={e => setFilters({ ...filters, max_price: e.target.value })}
        />

        <h2>Ordering price and quality</h2>
      <select onChange={e => setFilters({ ...filters, ordering: e.target.value })}>
        <option value="">Default</option>
        <option value="selling_price">Selling Price ↑</option>
        <option value="-selling_price">Selling Price ↓</option>
        <option value="purchase_price">Purchase Price ↑</option>
        <option value="-purchase_price">Purchase Price ↓</option>
        <option value="quantity">Quantity ↑</option>
        <option value="-quantity">Quantity ↓</option>
      </select>


        <h2>Qualty range</h2>
      <select
        onChange={(e) => {
          const range = e.target.value;

          if (range === "low") {
            setFilters({
              ...filters,
              min_quantity: 1,
              max_quantity: 50,
              quantity_range: range,
            });
          } else if (range === "medium") {
            setFilters({
              ...filters,
              min_quantity: 51,
              max_quantity: 100,
              quantity_range: range,
            });
          } else if (range === "high") {
            setFilters({
              ...filters,
              min_quantity: 101,
              max_quantity: "",
              quantity_range: range,
            });
          } else {
            // All range selected
            setFilters({
              ...filters,
              min_quantity: "",
              max_quantity: "",
              quantity_range: "",
            });
          }
        }}
      >
        <option value="">All</option>
        <option value="low">Low (1–50)</option>
        <option value="medium">Medium (51–100)</option>
        <option value="high">High (100+)</option>
      </select>


        <button
          onClick={(e) => {
            e.preventDefault();
            fetchProducts();
          }}
        >
          Apply Filters
        </button>
      </form>
        <h1>Filter data</h1>
          {Products.map((item) => (
          <div key={item.id}>
            <h3>{item.product_name}</h3>
            <p>purchase_price: {item.purchase_price},selling_price:{item.selling_price},category :{item.category.name},Quality:{item.quantity}</p>
          </div>
        ))}

    </>
  );
}


// UI

export const FilterModal = ({ isOpen, onClose, onApplyFilter, categories }) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [quantityFilter, setQuantityFilter] = useState('');

  const statusOptions = ['In Stock', 'Low Stock', 'Out of Stock'];
  
  const quantityRanges = [
    { label: 'All Quantities', value: '' },
    { label: 'Critical (< 20)', value: 'critical' },
    { label: 'Low (20-50)', value: 'low' },
    { label: 'Medium (51-100)', value: 'medium' },
    { label: 'High (> 100)', value: 'high' }
  ];

  const handleStatusToggle = (status) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApplyFilter({
      status: selectedStatus,
      categories: selectedCategories,
      priceRange,
      quantityFilter
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedStatus([]);
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setQuantityFilter('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>Filter Products</h2>
          
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '4px 8px',
              lineHeight: 1
            }}
          >×</button>
        </div>

        {/* Filter Content */}
        <div style={{ padding: '24px' }}>
          
          {/* Status Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>STOCK STATUS</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedStatus.includes(status) ? '#3b82f6' : '#e5e7eb'}`,
                    background: selectedStatus.includes(status) ? '#eff6ff' : 'white',
                    color: selectedStatus.includes(status) ? '#3b82f6' : '#6b7280',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: selectedStatus.includes(status) ? '500' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>CATEGORIES</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedCategories.includes(category) ? '#3b82f6' : '#e5e7eb'}`,
                    background: selectedCategories.includes(category) ? '#eff6ff' : 'white',
                    color: selectedCategories.includes(category) ? '#3b82f6' : '#6b7280',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: selectedCategories.includes(category) ? '500' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>PRICE RANGE</h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  color: '#6b7280'
                }}
              />
              <span style={{ color: '#6b7280', fontWeight: '500' }}>—</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  color: '#6b7280'
                }}
              />
            </div>
          </div>

          {/* Quantity Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>QUANTITY RANGE</h3>
            
            <select
              value={quantityFilter}
              onChange={(e) => setQuantityFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              {quantityRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          gap: '12px'
        }}>
          <button
            onClick={handleClear}
            style={{
              padding: '12px 24px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handleApply}
              style={{
                padding: '12px 24px',
                background: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


