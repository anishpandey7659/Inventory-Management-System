// import { useFetch } from "../UseHook";
// import { createProduct } from "../Apiservice";
// import { useState } from "react";
// import { getCategories,getSuppliers } from "../Apiservice";
// import { createCategory,createSupplier } from "../Apiservice";
// import { usePost } from "../UseHook";
// import { Package ,Plus,X} from "lucide-react";
// import AddProductModal from "./Subpage/Addproduct";

// export const  CreateCategoryModal = ({ isOpen, onClose}) => {
//   const { loading, error, success, postData } = usePost(createCategory);
//   const [cat,setcat]=useState('')
//   const [slug,setslug]=useState('')
//   const [errormsg, setErrorMsg] = useState('');
//   const [sucessmsg,setsuccessMsg] =useState('')


//   const generateSlug = (text) => {
//     return text
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '');
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setcat(value);
//     if (!slug || slug === generateSlug(cat)) {
//       setslug(generateSlug(value));
//     }
//   };

// const handleSave = async (e) => {
//     e.preventDefault();

//     if (!cat.trim()) {
//       setErrorMsg("Category name is required");
//       return;
//     }

//     const catdata = {
//       name: cat,
//       slug: slug || generateSlug(cat),
//     };

//     try {
//       const response = await postData(catdata);
//       console.log("Success:", response);

//       if (response) {
//         setsuccessMsg("Successfully created!");
//         setcat("");
//         setslug("");
//         onClose();

//         setTimeout(() => setsuccessMsg(""), 2000);
//       }
//     } catch (err) {
//       setErrorMsg("Failed to create category");
//       console.log("Error:", err.response.data);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//   <div
//     style={{position: "fixed",top: 0,left: 0,right: 0,bottom: 0,background: "rgba(0, 0, 0, 0.55)",display: "flex",alignItems: "center",justifyContent: "center",zIndex: 2000,}}
//   >
//     <div
//       style={{background: "white",borderRadius: "14px",width: "90%",maxWidth: "520px",boxShadow: "0 25px 60px rgba(0, 0, 0, 0.18)",overflow: "hidden",}}
//     >
//       <form onSubmit={handleSave}>
//         <div
//           style={{  padding: "22px 24px",borderBottom: "1px solid #e5e7eb",display: "flex",justifyContent: "space-between",alignItems: "center",gap: "12px",}}
//         >
//           <h3
//             style={{margin: 0,fontSize: "20px",fontWeight: "650",color: "#1f2937",}}
//           >
//             Create New Category
//           </h3>

//           <button
//             type="button"
//             title="Close"
//             onClick={() => {onClose();setcat("");setslug("");setErrorMsg("");}}
//             style={{background: "transparent",border: "none",fontSize: "26px",color: "#111827",cursor: "pointer",padding: "0 6px",lineHeight: 1,}}
//           >×
//           </button>
//         </div>

//         <div style={{ padding: "24px" }}>
//           {errormsg && (
//             <div
//               style={{background: "#fff1f2",border: "1px solid #fecaca",color: "#b91c1c",
//                 padding: "10px 14px",borderRadius: "10px",marginBottom: "16px",fontSize: "14px",
//               }}
//             >
//               ❌ {errormsg}
//             </div>
//           )}
//           {sucessmsg && (
//             <div
//               style={{background: "#fff1f2",border: "1px solid #fecaca",color: "#b91c1c",
//                 padding: "10px 14px",borderRadius: "10px",marginBottom: "16px",fontSize: "14px",
//               }}
//             >
//               ❌ {sucessmsg}
//             </div>
//           )}

//           <div style={{ marginBottom: "18px" }}>
//             <label
//               style={{display: "block",fontSize: "14px",fontWeight: "600",color: "#374151",marginBottom: "8px",}}
//             >
//               Category Name *
//             </label>
//             <input
//               type="text"
//               value={cat}
//               onChange={handleNameChange}
//               placeholder="e.g., Electronics"
//               style={{width: "100%",padding: "12px 14px",border: "1px solid #d1d5db",borderRadius: "10px",fontSize: "14px",outline: "none",transition: "0.2s",}}
//               onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//           </div>

//           <div style={{ marginBottom: "24px" }}>
//             <label
//               style={{display: "block",fontSize: "14px",fontWeight: "600",color: "#374151",marginBottom: "8px",}}
//             >
//               Slug
//             </label>
//             <input
//               type="text"
//               value={slug}
//               onChange={(e) => setslug(e.target.value)}
//               placeholder="auto-generated-slug"
//               style={{width: "100%",padding: "12px 14px",border: "1px solid #d1d5db",borderRadius: "10px",fontSize: "14px",outline: "none",background: "#f9fafb",transition: "0.2s",}}
//               onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//             <p style={{fontSize: "12px",color: "#6b7280",margin: "6px 0 0 0",}}>
//               Auto-generated from name, or customize
//             </p>
//           </div>

//           <div
//             style={{display: "flex",justifyContent: "flex-end",gap: "12px",}}
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 onClose();
//                 setcat("");
//                 setslug("");
//                 setErrorMsg("");
//               }}
//               style={{
//                 padding: "10px 22px",background: "white",border: "1px solid #d1d5db",borderRadius: "10px",color: "#374151",fontSize: "14px",
//                 fontWeight: "600",cursor: "pointer",transition: "0.2s",
//               }}
//               onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
//               onMouseLeave={(e) => (e.target.style.background = "white")}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               style={{padding: "10px 22px",background: "#10b981",border: "none",borderRadius: "10px",color: "white",fontSize: "14px",fontWeight: "600",cursor: "pointer",transition: "0.2s",}}
//               onMouseEnter={(e) => (e.target.style.background = "#0f9a70")}
//               onMouseLeave={(e) => (e.target.style.background = "#10b981")}
//             >
//               Create Category
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// };

// export const CreateSupplierModal = ({ isOpen, onClose, onSave }) => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [error, setError] = useState('');
//   const [successMsg, setsuccessMsg] = useState('');
//   const { loading: postLoading, error: postError, success, postData } = usePost(createSupplier);

//   const handleSave = async(e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       setError('Supplier name is required');
//       return;
//     }
//     if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     const supplier_data={name:name,phone:phone,email:email,address:address}
//     try{
//       const response =await postData(supplier_data)
//       console.log("Success:", response);
//       if (response){
//         setsuccessMsg("Sucessfully created");
//         setName("");
//         setPhone("");
//         setEmail("");
//         setAddress("");
//         setError("");
//         onClose();
//         setTimeout(() => setsuccessMsg(""), 2000);
//       }

//     }catch(err){
//       setError("Failed to create Supplier")
//       console.log("Error:", err.response?.data || err.message);
//     }
//   };


//   if (!isOpen) return null;

//   return (
//     <div style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,background: 'rgba(0, 0, 0, 0.6)',display: 'flex',alignItems: 'center',justifyContent: 'center',zIndex: 2000}}>
//       <div style={{background: 'white',borderRadius: '12px',width: '90%',maxWidth: '500px',boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'}}>
//         <form onSubmit={handleSave}>
//           <div style={{padding: '20px 24px',borderBottom: '1px solid #e5e7eb',display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
//             <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
//               Create New Supplier
//             </h3>
//               <button
//               onClick={() => {
//                 onClose();
//                 setName('');
//                 setPhone('');
//                 setEmail('');
//                 setAddress('');
//                 setError('');
//               }}
//               style={{
//                 background: 'transparent',border: 'none',fontSize: '24px',color: '#9ca3af',cursor: 'pointer',padding: '0'
//               }}
//               >×</button>
//         </div>

//         <div style={{ padding: '24px' }}>
//           {error && (
//             <div style={{
//               background: '#fef2f2',border: '1px solid #fecaca',color: '#dc2626',padding: '10px 14px',borderRadius: '8px',marginBottom: '16px',fontSize: '14px'
//             }}>
//               ❌ {error}
//             </div>
//           )}
//           {successMsg && (
//             <div style={{
//               background: '#fef2f2',border: '1px solid #fecaca',color: '#dc2626',padding: '10px 14px',borderRadius: '8px',marginBottom: '16px',fontSize: '14px'
//             }}>
//               ❌ {successMsg}
//             </div>
//           )}

//           <div style={{ marginBottom: '16px' }}>
//             <label style={{
//               display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
//             }}>Supplier Name *</label>
//             <input
//               type="text"value={name}onChange={(e) => setName(e.target.value)}placeholder="e.g., ABC Suppliers"
//               style={{
//                 width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: '16px' }}>
//             <label style={{
//               display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
//             }}>Phone</label>
//             <input
//               type="tel"value={phone} onChange={(e) => setPhone(e.target.value)}placeholder="e.g., +1 234 567 8900"maxLength={15}
//               style={{
//                 width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: '16px' }}>
//             <label style={{
//               display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
//             }}>Email</label>
//             <input
//               type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="supplier@example.com"
//               style={{
//                 width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none'
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: '24px' }}>
//             <label style={{
//               display: 'block',fontSize: '14px',fontWeight: '500',color: '#374151',marginBottom: '8px'
//             }}>Address</label>
//             <textarea
//               value={address} onChange={(e) => setAddress(e.target.value)}placeholder="123 Main St, City, Country"rows={3}
//               style={{
//                 width: '100%',padding: '10px 14px',border: '1px solid #d1d5db',borderRadius: '8px',fontSize: '14px',outline: 'none',resize: 'vertical',fontFamily: 'inherit'
//               }}
//             />
//           </div>

//           <div style={{
//             display: 'flex',justifyContent: 'flex-end',gap: '12px'
//           }}>
//             <button
//               onClick={() => {
//                 onClose();
//                 setName('');
//                 setPhone('');
//                 setEmail('');
//                 setAddress('');
//                 setError('');
//               }}
//               style={{
//                 padding: '10px 20px',background: 'white',border: '1px solid #d1d5db',borderRadius: '8px',color: '#374151',fontSize: '14px',fontWeight: '500',cursor: 'pointer'
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               style={{
//                 padding: '10px 20px',background: '#10b981',border: 'none',borderRadius: '8px',color: 'white',fontSize: '14px',fontWeight: '500',cursor: 'pointer'
//               }}
//             >
//               Create Supplier
//             </button>
//           </div>
//         </div>
//         </form>
//       </div>
//     </div>
//   );
// };



// // UI #################################################################################

// export const FilterModal = ({ isOpen, onClose, onApplyFilter, categories }) => {
//   const [Selectedorder, setSelectedorder] = useState([]);
//   const [SelectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [quantityFilter, setQuantityFilter] = useState('');
//   const [ordering, setOrdering] = useState('');
//   const [Products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     stock_status: '',
//     category: [],
//     min_price: '',
//     max_price: '',
//     min_quantity:'',
//     max_quantity:'',
//     quantity_range: '',
//     ordering: '',
//   });

//   const orderOptions = ['selling_price', '-selling_price', 'purchase_price','-purchase_price','quantity','-quantity'];
  

//   const ordeingValue= [
//     { label: 'Default', value: '' },
//     { label: 'Selling Price (Asc)↑', value: 'selling_price' },
//     { label: 'Selling Price (desc) ↓', value: '-selling_price' },
//     { label: 'Purchase Price (Asc) ↑', value: 'purchase_price' },
//     { label: 'Purchase Price (desc) ↓', value: '-purchase_price' },
//     { label: 'Quantity (Asc) ↑', value: 'quantity' },
//     { label: 'Quantity (desc) ↓', value: '-quantity' }
//   ];

//   const handleOrderToggle = (status) => {
//     setSelectedorder(prev => 
//       prev.includes(status) 
//         ? prev.filter(s => s !== status)
//         : [...prev, status]
//     );
//   };

//   const handleCategoryToggle = (category) => {
//     setSelectedCategories(prev => 
//       prev.includes(category) 
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };





//   const handleApply = () => {
//     onApplyFilter({
//       categories: SelectedCategories,
//       priceRange,
//       quantityFilter,
//       ordering,
//     });
//     onClose();
//   };

//   const handleClear = () => {
//     setSelectedorder([]);
//     setSelectedCategories([]);
//     setPriceRange({ min: '', max: '' });
//     setQuantityFilter('');
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 999
//         }}
//       />

//       {/* Modal */}
//       <div style={{
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         background: 'white',
//         borderRadius: '12px',
//         boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//         zIndex: 1000,
//         width: '90%',
//         maxWidth: '700px',
//         maxHeight: '90vh',
//         overflow: 'auto'
//       }}>
        
//         {/* Header */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '20px 24px',
//           borderBottom: '1px solid #e5e7eb'
//         }}>
//           <h2 style={{
//             fontSize: '18px',
//             fontWeight: '600',
//             color: '#1f2937',
//             margin: 0
//           }}>Filter Products</h2>
          
//           <button 
//             onClick={onClose}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               fontSize: '24px',
//               color: '#6b7280',
//               cursor: 'pointer',
//               padding: '4px 8px',
//               lineHeight: 1
//             }}
//           >×</button>
//         </div>

//         {/* Filter Content */}
//         <div style={{ padding: '24px' }}>
          
//           {/* Odering Filter  */}
//               <div style={{ marginBottom: '24px' }}>
//                 <h3 style={{fontSize: '14px',fontWeight: '600',color: '#374151',marginBottom: '12px',textTransform: 'uppercase',letterSpacing: '0.5px'}}>Ordering price and quality</h3>
//                 <select value={ordering}
//                   onChange={(e) => setOrdering(e.target.value)}
//                   style={{
//                     width: '100%',padding: '12px 14px',border: '1px solid #e5e7eb',borderRadius: '8px',fontSize: '14px',
//                     outline: 'none',background: 'white',cursor: 'pointer',color: '#6b7280'
//                   }}
//                 >
//                   {ordeingValue.map(range => (
//                     <option key={range.value} value={range.value}>
//                       {range.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//           {/* Category Filter */}
//           <div style={{ marginBottom: '24px' }}>
//             <h3 style={{
//               fontSize: '14px',
//               fontWeight: '600',
//               color: '#374151',
//               marginBottom: '12px',
//               textTransform: 'uppercase',
//               letterSpacing: '0.5px'
//             }}>CATEGORIES</h3>
            
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//               {categories?.map(category => (
//                 <button
//                   key={category.name}
//                   onClick={() => handleCategoryToggle(category)}
//                   style={{
//                     padding: '10px 16px',
//                     borderRadius: '8px',
//                     border: `1px solid ${SelectedCategories.includes(category) ? '#3b82f6' : '#e5e7eb'}`,
//                     background: SelectedCategories.includes(category) ? '#eff6ff' : 'white',
//                     color: SelectedCategories.includes(category) ? '#3b82f6' : '#6b7280',
//                     fontSize: '14px',
//                     cursor: 'pointer',
//                     fontWeight: SelectedCategories.includes(category) ? '500' : '400',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price Range Filter */}
//           <div style={{ marginBottom: '24px' }}>
//             <h3 style={{
//               fontSize: '14px',
//               fontWeight: '600',
//               color: '#374151',
//               marginBottom: '12px',
//               textTransform: 'uppercase',
//               letterSpacing: '0.5px'
//             }}>PRICE RANGE</h3>
            
//             <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//               <input
//                 type="number"
//                 placeholder="Min"
//                 value={priceRange.min}
//                 onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
//                 style={{
//                   flex: 1,
//                   padding: '12px 14px',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   outline: 'none',
//                   color: '#6b7280'
//                 }}
//               />
//               <span style={{ color: '#6b7280', fontWeight: '500' }}>—</span>
//               <input
//                 type="number"
//                 placeholder="Max"
//                 value={priceRange.max}
//                 onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
//                 style={{
//                   flex: 1,
//                   padding: '12px 14px',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   outline: 'none',
//                   color: '#6b7280'
//                 }}
//               />
//             </div>
//           </div>

//         </div>

//         {/* Footer */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           padding: '16px 24px',
//           borderTop: '1px solid #e5e7eb',
//           gap: '12px'
//         }}>
//           <button
//             onClick={handleClear}
//             style={{
//               padding: '12px 24px',
//               background: 'white',
//               border: '1px solid #e5e7eb',
//               borderRadius: '8px',
//               color: '#374151',
//               fontSize: '14px',
//               fontWeight: '500',
//               cursor: 'pointer'
//             }}
//           >
//             Clear All
//           </button>
          
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <button
//               onClick={onClose}
//               style={{
//                 padding: '12px 24px',
//                 background: 'white',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '8px',
//                 color: '#374151',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 cursor: 'pointer'
//               }}
//             >
//               Cancel
//             </button>
            
//             <button
//               onClick={handleApply}
//               style={{
//                 padding: '12px 24px',
//                 background: '#3b82f6',
//                 border: 'none',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 cursor: 'pointer'
//               }}
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// // ###########################################################

// import  { useRef,useEffect } from 'react';

// export const ActionMenu = ({ itemId, onEdit, onDelete }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   const handleEdit = () => {
//     onEdit(itemId);
//     setIsOpen(false);
//   };

//   const handleDelete = () => {
//     onDelete(itemId);
//     setIsOpen(false);
//   };

//   return (
//     <div style={{ position: 'relative' }} ref={menuRef}>
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           background: 'transparent',
//           border: 'none',
//           color: '#6b7280',
//           fontSize: '18px',
//           cursor: 'pointer',
//           padding: '4px 8px',
//           borderRadius: '4px',
//           transition: 'background 0.2s'
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
//         onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//       >
//         ⋮
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           right: 0,
//           top: '100%',
//           marginTop: '4px',
//           background: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//           border: '1px solid #e5e7eb',
//           minWidth: '140px',
//           zIndex: 1000,
//           overflow: 'hidden'
//         }}>
//           <button
//             onClick={handleEdit}
//             style={{
//               width: '100%',
//               padding: '10px 16px',
//               background: 'transparent',
//               border: 'none',
//               textAlign: 'left',
//               cursor: 'pointer',
//               fontSize: '14px',
//               color: '#374151',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               transition: 'background 0.2s'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
//             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//           >
//             <span style={{ fontSize: '16px', color: '#3b82f6' }}>✏️</span>
//             Edit
//           </button>

//           <button
//             onClick={handleDelete}
//             style={{
//               width: '100%',
//               padding: '10px 16px',
//               background: 'transparent',
//               border: 'none',
//               textAlign: 'left',
//               cursor: 'pointer',
//               fontSize: '14px',
//               color: '#374151',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               transition: 'background 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#fef2f2';
//               e.currentTarget.style.color = '#dc2626';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#374151';
//             }}
//           >
//             <span style={{ fontSize: '16px', color: '#ef4444' }}>🗑️</span>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };









// import { getProducts,createStockIn } from "../Apiservice";
// import { useCategories,useSuppilier} from "../UseHook";
// // Stockin
// export default function StockInPage({isOpen, onClose,head}) {
//   const [name,setName]=useState('');
//   const [product, setproduct] = useState("");
//   const [Supplier, setSupplier] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [purchase_price, setPurchase_price] = useState("");
//   const { data, loading, error } = useFetch(getProducts, []);
//   const [successMsg,setSuccessMsg]=useState('')
//   const [errorMsg,setErrorMsg]=useState('')
//   const [showCreateProduct,setshowCreateProduct]=useState(false)
//   const { data: suppliers, loadingSup, errorSup  } =useSuppilier();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("add");
//   const [selectedProduct, setSelectedProduct] = useState(null);


//   if (loading) return null;
//   if (error) return null;
//   const productNames = data?.map(p => p.product_name);
//   // console.log(data)
//   // const { data: suppliers, loadingSup, errorSup  } =useSuppilier();

//   const handleProductChange = (e) => {
//     const value = e.target.value;
//       if (value === 'create_new') {
//         setshowCreateProduct(true)
//       } 
//       else {
//         setproduct(value);
//       }
//     };
//   const resetForm = () => {
//   setproduct("");
//   setPurchase_price("");
//   setQuantity("");
//   setSupplier("");
// };

//   const handleSupplierChange = (e) => {
//       const value = e.target.value;
//       setSupplier(value);
//     };

//   const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!product || !quantity ) {
//           setErrorMsg("Please select all ");
//           return;
//         }
    
//         const productData = {
//           product: product, 
//           purchase_price: purchase_price,
//           quantity: quantity,
//           supplier:Supplier
        
//         };
//         console.log(productNames);

    
//         try {
//             await createStockIn(productData);
//             setSuccessMsg("Product created successfully!");
//             setTimeout(() => {
//             resetForm();
//             onClose();
//           }, 1200);
    
//         } catch (err) {
//           const errors = err.response?.data;
//           let errorText = "Something went wrong.";
//           if (errors) {
//             errorText = Object.entries(errors)
//               .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
//               .join(" | ");
//           }
//           setErrorMsg(errorText);
//         }
//       };

// if (!isOpen) return null;



// return (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
//     <div className="bg-white rounded-xl w-[90%] max-w-[700px] max-h-[90vh] overflow-auto shadow-2xl">
//       <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//         <h2 className="m-0 text-[22px] font-semibold text-gray-800">
//           Stock In
//         </h2>
//         <button
//           onClick={onClose}
//           className="bg-transparent border-none text-2xl text-gray-400 cursor-pointer p-0 w-8 h-8 flex items-center justify-center hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>

//       {successMsg && (
//         <div className="bg-green-50 border border-green-200 text-green-800 py-2.5 px-3.5 rounded-lg mb-4 text-sm">
//           ✅ {successMsg}
//         </div>
//       )}

//       {errorMsg && (
//         <div className="bg-red-600 border border-green-200 text-gray-50 py-2.5 px-3.5 rounded-lg mb-4 text-sm">
//           ❌ {errorMsg}
//         </div>
//       )}

//       <div className="p-6">
//         <div className="grid grid-cols-1 gap-4 mb-3">
          
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product
//             </label>

//             <select
//               value={product}
//               onChange={(e) => {
//                 const value = e.target.value;

//                 if (value === "create_new") {
//                   // Open modal to create new product
//                   setModalMode("add");
//                   setSelectedProduct(null);
//                   setIsModalOpen(true);
//                   // Reset product selection
//                   setproduct("");
//                   return;
//                 }

//                 // Set selected product normally
//                 setproduct(value);
//                 // Only call handleProductChange if it exists
//                 if (typeof handleProductChange === 'function') {
//                   handleProductChange(e);
//                 }
//               }}
//               className="w-full py-2.5 px-3.5 rounded-lg border border-gray-300 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Product</option>

//               {data.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.product_name}
//                 </option>
//               ))}

//               <option value="create_new">
//                 + Create New Product
//               </option>
//             </select>

//             <AddProductModal
//               isOpen={isModalOpen}
//               head={modalMode === "edit" ? "Edit Product" : "Add New Product"}
//               onClose={() => {
//                 setIsModalOpen(false);
//                 setSelectedProduct(null);
//               }}
//               mode={modalMode}
//               product={selectedProduct}
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Supplier
//             </label>
//             <select
//               value={Supplier}
//               onChange={handleSupplierChange}
//               className="w-full py-2.5 px-3.5 rounded-lg border border-gray-300 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Supplier</option>
//               {suppliers.map((sup) => (
//                 <option key={sup.id} value={sup.id}>
//                   {sup.name}
//                 </option>
//               ))}
//             </select>
//           </div>
        
//         </div>
          
//         <div className="grid grid-cols-1 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Quantity 
//             </label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               placeholder="Enter quantity"
//               min="1"
//               step="1"
//               className="w-full py-2.5 px-3.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Purchase Price 
//             </label>
//             <input
//               type="number"
//               value={purchase_price}
//               onChange={(e) => setPurchase_price(e.target.value)}
//               placeholder="Enter purchase price"
//               min="0"
//               step="0.01"
//               className="w-full py-2.5 px-3.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={() => {
//               resetForm();
//               if (typeof onClose === 'function') {
//                 onClose();
//               }
//             }}
//             className="py-2.5 px-6 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium cursor-pointer hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="py-2.5 px-6 bg-blue-500 border-none rounded-lg text-white text-sm font-medium cursor-pointer hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>



//   </div>
// );
// };



// /////
  
export const buildFilterParams = (filters) => {
  const params = {};

  // status (array → comma separated)
  if (filters.status?.length) {
    params.status = filters.status.join(',');
  }

  // categories (objects → ids)
  if (filters.categories?.length) {
    params.category = filters.categories.map(c => c.id).join(',');
  }

  // price range
  if (filters.priceRange?.min != null) {
    params.min_selling_price = filters.priceRange.min;
  }
  if (filters.priceRange?.max != null) {
    params.max_selling_price = filters.priceRange.max;
  }


  // quantity filter
  if (filters.quantityFilter) {
    params.quantity_range = filters.quantityFilter;
  }
  if (filters.ordering) {
    params.ordering = filters.ordering;
  }

  return params;
};
