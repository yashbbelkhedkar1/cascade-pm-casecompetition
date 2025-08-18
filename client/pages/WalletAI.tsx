import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import Header from "../components/Header";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  data?: any;
  timestamp: Date;
}

export default function WalletAI() {
  const navigate = useNavigate();
  const { transactions } = useTransactions();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm your AI financial assistant. I can help you track expenses, set goals, find loans, and give budgeting tips. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes("spending") || input.includes("expense")) {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        id: Date.now().toString(),
        type: "ai",
        content: `Here's your spending breakdown for ${currentMonth}:`,
        data: {
          type: "spending_breakdown",
          breakdown: [
            { category: "Food", amount: 4200, icon: "🍽️" },
            { category: "Rent", amount: 8000, icon: "🏠" },
            { category: "Entertainment", amount: 1500, icon: "🎬" }
          ],
          total: 13700,
          tip: "You're spending 30% more on food than last month. Try cooking at home 2 more days a week to save ₹800!"
        },
        timestamp: new Date()
      };
    }

    if (input.includes("goal") || input.includes("save")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "I can help you set up savings goals! Based on your spending patterns, I recommend starting with a monthly savings target of ₹5,000. Would you like me to create a goal for you?",
        timestamp: new Date()
      };
    }

    if (input.includes("budget")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "For effective budgeting, follow the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Based on your income, here's a suggested budget breakdown.",
        data: {
          type: "budget_suggestion",
          needs: "₹25,000",
          wants: "₹15,000",
          savings: "₹10,000"
        },
        timestamp: new Date()
      };
    }

    if (input.includes("loan") || input.includes("credit")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "I can help you find the best loan options! Based on your financial profile, you're eligible for personal loans up to ₹5,00,000 at competitive rates. Would you like me to show you available options?",
        timestamp: new Date()
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content: "I'm here to help with your finances! You can ask me about:\n• Your spending patterns\n• Setting savings goals\n• Budget planning\n• Loan options\n• Investment advice\n\nWhat would you like to know?",
      timestamp: new Date()
    };
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title="WalletAI"
        showBackButton={true}
        onBackClick={() => navigate(-1)}
        rightContent={
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
          </div>
        }
      />

      {/* AI Assistant Info */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-center">
        <p className="text-xs text-white/80">Your AI Financial Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
              {message.type === "ai" && (
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">AI Assistant</span>
                </div>
              )}
              
              <div className={`rounded-2xl p-3 ${
                message.type === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white shadow-sm border border-gray-100"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Special data rendering */}
                {message.data?.type === "spending_breakdown" && (
                  <div className="mt-4 space-y-3">
                    {message.data.breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total Spent:</span>
                        <span>₹{message.data.total.toLocaleString()}</span>
                      </div>
                    </div>
                    {message.data.tip && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-blue-800">Smart Tip</p>
                            <p className="text-sm text-blue-700">{message.data.tip}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {message.data?.type === "budget_suggestion" && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600">Needs</p>
                      <p className="font-semibold text-green-800">{message.data.needs}</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-600">Wants</p>
                      <p className="font-semibold text-yellow-800">{message.data.wants}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600">Savings</p>
                      <p className="font-semibold text-blue-800">{message.data.savings}</p>
                    </div>
                  </div>
                )}
              </div>

              {message.type === "user" && (
                <div className="flex items-center justify-end mt-2">
                  <span className="text-xs text-gray-500 mr-2">You</span>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => handleQuickAction("Show me my spending this month")}
            className="whitespace-nowrap bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm font-medium"
          >
            Monthly Spending
          </button>
          <button
            onClick={() => handleQuickAction("Help me create a budget")}
            className="whitespace-nowrap bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium"
          >
            Budget Plan
          </button>
          <button
            onClick={() => handleQuickAction("Show me loan options")}
            className="whitespace-nowrap bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium"
          >
            Loan Options
          </button>
        </div>

        {/* Input */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about expenses, goals, loans..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              inputValue.trim() 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
