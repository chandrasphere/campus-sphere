import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, ArrowUp, Loader2, Sparkles } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I am Campus Sphere AI. I can help you find the best hostels. Just ask!", isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setIsLoading(true);

    try {
      
      const data = [
        { name: "Scholars Inn", details: "0.5 km from campus, ₹8,500/mo, located near the Library gate." },
        { name: "The Student Hub PG", details: "1.2 km from campus, ₹12,000/mo, features a Gym and High-speed WiFi." },
        { name: "Green View Residency", details: "2.0 km from campus, ₹15,000/mo, offers shared apartments." }
      ];

      const found = data.find(h => userMsg.toLowerCase().includes(h.name.toLowerCase().split(' ')[0]));

      setTimeout(() => {
        const reply = found 
          ? `Yes, ${found.name} is an excellent choice. Details: ${found.details}`
          : "Currently, I have detailed information about Scholars Inn and Student Hub. Would you like to know more about them?";
        
        setMessages(prev => [...prev, { text: reply, isBot: true }]);
        setIsLoading(false);
      }, 800);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, fontFamily: 'Inter, sans-serif' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 15px 35px rgba(37, 99, 235, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} fill="white" />}
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', bottom: '85px', right: '0', width: '360px', height: '520px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '700' }}>
              <Sparkles size={20} /> Campus AI
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>Always ready to help you</div>
          </div>

          <div ref={scrollRef} style={{ flex: 1, padding: '20px', backgroundColor: '#f8fafc', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', backgroundColor: m.isBot ? 'white' : '#2563eb', color: m.isBot ? '#1e293b' : 'white', padding: '12px 16px', borderRadius: m.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px', fontSize: '14px', maxWidth: '85%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: m.isBot ? '1px solid #e2e8f0' : 'none' }}>
                {m.text}
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin" size={18} color="#2563eb" />}
          </div>

          <div style={{ padding: '20px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f5f9', padding: '8px 8px 8px 16px', borderRadius: '14px' }}>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your question..." 
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: '#1e293b' }} 
              />
              <button 
                onClick={handleSend}
                style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;