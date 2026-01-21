import React, { useState,useEffect } from 'react';
import { getCategories,getSuppliers } from "../Apiservice";
import { createProduct } from "../Apiservice";  
import { useFetch } from '../UseHook';
import { CreateCategoryModal,CreateSupplierModal } from './Func';
import { createCategory,createSupplier } from "../Apiservice";
import { usePost } from "../UseHook";

const AddProductModal = ({ isOpen, onClose ,head }) => {

  const { data: suppliers } = useFetch(getSuppliers);
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(getCategories);
  const { loading: postLoading, error: postError, success, postData } = usePost(createCategory);
  
  const [cat,setcat]=useState('')
  const [slug,setslug]=useState('')
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [SP, setSP] = useState("");
  const [PP, setPP] = useState("");
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateSupplier, setShowCreateSupplier] = useState(false);
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [sku, setSku] = useState("");
  const purchasePrice = Number(PP);
  const sellingPrice = Number(SP);
  const profit =purchasePrice && sellingPrice
    ? (sellingPrice - purchasePrice).toFixed(2)
    : 0;

  const profitMargin =purchasePrice
    ? (((sellingPrice - purchasePrice) / purchasePrice) * 100).toFixed(2)
    : 0;

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'create_new') {
      setShowCreateCategory(true);
    } else {
      setCategory(value);
    }
  };

  const handleSupplierChange = (e) => {
    const value = e.target.value;
    if (value === 'create_new') {
      setShowCreateSupplier(true);
    } else {
      setSupplier(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplier) {
      setErrorMsg("Please select a supplier");
      return;
    }
    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    const productData = {
      product_name: name,
      selling_price: SP,
      purchase_price: PP,
      category: Number(category),   // this must be ID
      supplier: Number(supplier),   // this must be ID
      quantity: quantity,
      sku: sku,
    };

    try {
    await createProduct(productData);
    setSuccessMsg("Product created successfully!");
    setTimeout(() => {
    resetForm();
    }, 1200);
    } 
    catch (err) {
    const errors = err.response?.data;
    let errorText = "Something went wrong.";
    if (errors) {
      errorText = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join(" | ");
    }

  setErrorMsg(errorText);
}
  };

  const resetForm = () => { setName(""); setSku(""); setCategory(""); setSupplier("");
  setQuantity("");setPP("");setSP("");setSuccessMsg(""); // if you have success message state
 };

useEffect(() => {
  if (successMsg) {
    setErrorMsg("");
    const timer = setTimeout(() => setSuccessMsg(""), 7000);
    return () => clearTimeout(timer);
  }

  if (errorMsg) {
    setSuccessMsg("");
    const timer = setTimeout(() => setErrorMsg(""), 7000);
    return () => clearTimeout(timer);
  }
}, [successMsg, errorMsg]);



  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: '600',
            color: '#1f2937'
          }}>{head}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >×</button>
        </div>

      {successMsg && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#166534',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          ✅ {successMsg}
        </div>
      )}
      { errorMsg && (
        <div style={{
          background: '#dc2626',
          border: '1px solid #bbf7d0',
          color: '#eff3ef',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          ❌ {errorMsg}
        </div>
      )}
      
    {/* Form */}
        <form
            style={{ padding: '24px' }}  onSubmit={handleSubmit}
          >
          
          {/* Row 1: Product Name & SKU */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>{head}</label>
              <input
                type="text"
                name="productName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>SKU</label>
              <input
                type="text"
                name="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Row 2: Category & Quantity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Category</label>
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white'
                }}
              >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
                <option value="create_new" style={{ fontWeight: '600', color: '#3b82f6' }}>
                  + Create New Category
                </option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Row 3: Purchase Price & Selling Price */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Purchase Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="purchasePrice"
                value={PP}
                onChange={(e) => setPP(e.target.value)}
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: '4px 0 0 0'
              }}>Cost to purchase/make</p>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Selling Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="sellingPrice"
                value={SP}
                onChange={(e) => setSP(e.target.value)}
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: '4px 0 0 0'
              }}>Price to sell to customers</p>
            </div>
          </div>

          {/* Profit Indicator */}
          {PP && SP && (
            <div style={{
              background: profit >= 0 ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${profit >= 0 ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginRight: '8px'
                  }}>Profit per unit:</span>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: profit >= 0 ? '#16a34a' : '#dc2626'
                  }}>${profit}</span>
                </div>
                <div>
                  <span style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginRight: '8px'
                  }}>Margin:</span>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: profit >= 0 ? '#16a34a' : '#dc2626'
                  }}>{profitMargin}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>Supplier</label>
            <select
              name="supplier"
              value={supplier}
              onChange={handleSupplierChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
                <option value="create_new" style={{ fontWeight: '600', color: '#3b82f6' }}>
                  + Create New Supplier
                </option>
              </select>
            </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              type="button"
              onClick={() => {resetForm();  onClose(); }}
              style={{
                padding: '10px 24px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
              <button type="submit"
                style={{
                  padding: '10px 24px',
                  background: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
            >
              Save Product
            </button>
          </div>
        </form>
        </div>


         {/* Category Creation Modal */}
      <CreateCategoryModal
        isOpen={showCreateCategory}
        onClose={() => setShowCreateCategory(false)}
        // onSave={handleCreateCategory}
      />

      {/* Supplier Creation Modal */}
      <CreateSupplierModal
        isOpen={showCreateSupplier}
        onClose={() => setShowCreateSupplier(false)}
        // onSave={handleCreateSupplier}
      />

      </div>

  );
};

// Demo wrapper to show the modal
// const Add = () => {
//   const [isModalOpen, setIsModalOpen] = useState(true);

//   return (
//     <div style={{ padding: '40px' }}>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         style={{
//           padding: '12px 24px',
//           background: '#3b82f6',
//           border: 'none',
//           borderRadius: '8px',
//           color: 'white',
//           fontSize: '14px',
//           fontWeight: '500',
//           cursor: 'pointer'
//         }}
//       >
//         Open Add Product Modal
//       </button>

//       <AddProductModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//       />
//     </div>
//   );
// };

// export default Add;
export default AddProductModal;