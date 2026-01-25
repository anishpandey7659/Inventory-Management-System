import React, { useState } from 'react';
import { Package, Menu, X, TrendingUp, BarChart, Shield, Smartphone, PieChart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [Loading,setLoading] =useState("")
  const [Errors,setErrors] =useState("")
  const [Success,setSuccess] =useState("")
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleAuthSubmit = (e) => {
  e.preventDefault();
  if (isLogin) {
    handleLogin(e);
  } else {
    handleRegistration(e);
  }
};

  const openAuthModal = (loginMode = true) => {
    setIsLogin(loginMode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
  };

  const handleContactForm = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add password confirmation validation before sending
const handleRegistration = async (e) => {
  e.preventDefault();
  // Validate password confirmation (if you have confirmPassword field)
  if (formData.password !== formData.confirmPassword) {
    setErrors({ confirmPassword: 'Passwords do not match' });
    return;
  }
  
  // Validate password strength
  if (formData.password.length < 8) {
    setErrors({ password: 'Password must be at least 8 characters' });
    return;
  }
  
  setLoading(true);
  setErrors({}); // Clear previous errors before new submission
  const userData = {
    email: formData.email,
    password: formData.password,
    username:formData.username
  };
  console.log(userData)
  
  try {
    const response = await axios.post('http://127.0.0.1:8000/register/', userData);
    
    console.log('Registration successful:', response.data);
    setSuccess(true);
    navigate('/dashboard')
    
    // Store token if returned
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    // Clear form
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.response?.data) {
      setErrors(error.response.data);
    } else if (error.request) {
      setErrors({ general: 'Cannot reach server. Please try again.' });
    } else {
      setErrors({ general: 'An unexpected error occurred.' });
    }
    
    setSuccess(false);
    
  } finally {
    setLoading(false);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrors({}); // Clear previous errors
  console.log(formData);

  const userData = {username: formData.username,password: formData.password};

  console.log('UserData =>', userData);

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData);
    console.log(response.data);    
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    console.log("Login Successful");
    navigate('/dashboard');
    setIsLogin(true)
    
  } catch (error) {
    // console.error("Login error:", error);
    console.log("Error response data:", error.response?.data); 
    setErrors("Invalid Credentials")
    
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Package className="text-blue-600 mr-2" size={28} />
                <span className="text-xl font-bold text-gray-800">IMS</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="nav-link text-gray-900 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#about" className="nav-link text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="nav-link text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                <button onClick={() => openAuthModal(true)} className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</button>
                <button onClick={() => openAuthModal(false)} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Register</button>
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block text-gray-900 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#about" className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#contact" className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">Contact</a>
              <button onClick={() => openAuthModal(true)} className="block w-full text-left text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">Login</button>
              <button onClick={() => openAuthModal(false)} className="block w-full text-left bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Inventory Management System</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Streamline your inventory operations with our cutting-edge management solution</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openAuthModal(false)} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Started Free
              </button>
              <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-blue-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your inventory levels in real-time with advanced analytics and reporting</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Shield className="text-blue-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security ensures your data is always protected and accessible</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Smartphone className="text-blue-600" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
              <p className="text-gray-600">Manage your inventory on the go with our responsive mobile interface</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About IMS</h2>
              <p className="text-gray-600 mb-4">
                IMS is a comprehensive inventory management solution designed to help businesses of all sizes optimize their stock control processes. Our platform combines powerful features with an intuitive interface to deliver exceptional user experience.
              </p>
              <p className="text-gray-600 mb-4">
                With over 10 years of industry experience, we've helped thousands of businesses reduce costs, improve efficiency, and scale their operations seamlessly.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20} /> Cloud-based solution for remote access</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20} /> Automated inventory tracking</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20} /> Advanced reporting and analytics</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" size={20} /> 24/7 customer support</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <PieChart className="text-blue-600" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Trusted by 10,000+ Businesses</h3>
              <p className="text-gray-600">Join the companies that have transformed their inventory management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <button onClick={() => alert('Message sent successfully!')} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Send Message
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="text-blue-600" size={20} />
                    <span className="ml-3 text-gray-600">info@ims.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-blue-600" size={20} />
                    <span className="ml-3 text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-blue-600" size={20} />
                    <span className="ml-3 text-gray-600">123 Business Ave, Suite 100, City, State 12345</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Facebook size={28} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Twitter size={28} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Linkedin size={28} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Instagram size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2024 IMS - Inventory Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Login' : 'Register'}</h2>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {Errors && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {Errors.data}
            </div>
          )}
            <div className="space-y-4">
              {!isLogin && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              )}
              <div>
                  <label className="block text-gray-700 font-medium mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter your Username"
                  />
                </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600 text-sm">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
                </div>
              )}
              {!isLogin && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600 text-sm">I agree to the Terms and Conditions</span>
                </div>
              )}
              <button onClick={handleAuthSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
            <p className="text-center mt-4 text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}