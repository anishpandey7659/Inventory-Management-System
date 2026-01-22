import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Paperclip, MoreVertical, Sparkles, TrendingUp, FileText, Package, Users } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m your Invento AI assistant. I can help you with invoices, revenue insights, customer data, and inventory management. What would you like to explore today?',
      time: '10:30 AM',
      suggestions: ['📊 Revenue Analytics', '📄 Invoice Status', '👥 Top Customers', '📦 Inventory Check']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: getCurrentTime()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: botResponse.text,
        time: getCurrentTime(),
        suggestions: botResponse.suggestions,
        card: botResponse.card
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('invoice') || message.includes('status')) {
      return {
        text: 'Here\'s your invoice overview! You have 5 total invoices with a healthy payment rate. 💼',
        card: {
          type: 'invoices',
          data: {
            total: 5,
            paid: { count: 3, amount: 3839.96 },
            pending: { count: 2, amount: 1549.99 }
          }
        },
        suggestions: ['Show pending invoices', 'Payment reminders', 'Create new invoice']
      };
    } else if (message.includes('revenue') || message.includes('sales') || message.includes('analytics')) {
      return {
        text: 'Your revenue is looking great! 📈 Here\'s a quick summary of your financial performance.',
        card: {
          type: 'revenue',
          data: {
            total: 5389.95,
            growth: 12.5,
            trend: 'up'
          }
        },
        suggestions: ['Monthly breakdown', 'Revenue forecast', 'Export report']
      };
    } else if (message.includes('customer') || message.includes('top')) {
      return {
        text: 'Here are your top performing customers! These VIPs contribute the most to your revenue. ⭐',
        card: {
          type: 'customers',
          data: [
            { name: 'Alex Morgan', amount: 1850.50, invoices: 4 },
            { name: 'Sarah Connor', amount: 1250.00, invoices: 3 },
            { name: 'John Smith', amount: 980.75, invoices: 2 }
          ]
        },
        suggestions: ['View all customers', 'Send thank you note', 'Loyalty program']
      };
    } else if (message.includes('inventory') || message.includes('stock')) {
      return {
        text: 'Your inventory status at a glance. You have some items that need attention! 📦',
        card: {
          type: 'inventory',
          data: {
            total: 156,
            lowStock: 3,
            outOfStock: 1
          }
        },
        suggestions: ['View low stock', 'Reorder items', 'Inventory report']
      };
    } else if (message.includes('help')) {
      return {
        text: 'I\'m here to make your business management easier! ✨ I can provide insights on invoices, track revenue, analyze customers, and monitor inventory. Just ask me anything!',
        suggestions: ['💰 Revenue insights', '📊 Business analytics', '🎯 Quick actions', '📝 Generate report']
      };
    } else {
      return {
        text: 'I\'m your AI-powered business assistant! I can help you understand your data better and make informed decisions. What would you like to explore? 🚀',
        suggestions: ['📊 Dashboard overview', '💼 Invoice management', '👥 Customer insights', '📦 Inventory status']
      };
    }
  };

  const renderCard = (card) => {
    if (!card) return null;

    switch (card.type) {
      case 'invoices':
        return (
          <div className="mt-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <FileText className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{card.data.total}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="w-5 h-5 bg-green-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{card.data.paid.count}</p>
                <p className="text-xs text-gray-600">Paid</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="w-5 h-5 bg-orange-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-orange-600 text-lg">⏱</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{card.data.pending.count}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        );
      
      case 'revenue':
        return (
          <div className="mt-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-900">${card.data.total.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-white rounded-lg p-2">
              <span className="text-green-600 font-semibold">↑ {card.data.growth}%</span>
              <span className="text-sm text-gray-600">vs last month</span>
            </div>
          </div>
        );
      
      case 'customers':
        return (
          <div className="mt-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 space-y-2">
            {card.data.map((customer, index) => (
              <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.invoices} invoices</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">${customer.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        );
      
      case 'inventory':
        return (
          <div className="mt-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <Package className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{card.data.total}</p>
                <p className="text-xs text-gray-600">Total Items</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="w-5 h-5 bg-orange-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-orange-600 text-xs">⚠</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{card.data.lowStock}</p>
                <p className="text-xs text-gray-600">Low Stock</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="w-5 h-5 bg-red-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-red-600 text-xs">✕</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{card.data.outOfStock}</p>
                <p className="text-xs text-gray-600">Out of Stock</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 p-6 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Invento AI Assistant
                </h1>
                <p className="text-sm text-green-600 flex items-center gap-2 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online & Ready to Help
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all hover:scale-110">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="bg-white bg-opacity-60 backdrop-blur-md border-x border-gray-200 p-6 overflow-y-auto" style={{ height: 'calc(100% - 220px)' }}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="animate-fadeIn">
                <div className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500' 
                      : 'bg-gradient-to-br from-blue-600 to-blue-700'
                  }`}>
                    {message.type === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : ''} max-w-[75%]`}>
                    <div className={`rounded-2xl px-5 py-3 shadow-md ${
                      message.type === 'bot' 
                        ? 'bg-white text-gray-900 border border-gray-200' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    {renderCard(message.card)}
                    <span className="text-xs text-gray-500 mt-2 px-2">{message.time}</span>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.type === 'bot' && (
                  <div className="ml-14 mt-4 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 text-sm bg-white border-2 border-gray-200 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-md hover:scale-105 font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 animate-fadeIn">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl px-5 py-3 border border-gray-200 shadow-md">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl shadow-lg border border-gray-200 p-5 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-end gap-3">
            <button className="p-3 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all hover:scale-110 flex-shrink-0">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your business..."
                rows="1"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none shadow-sm"
                style={{ maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by AI • Verify important information
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;