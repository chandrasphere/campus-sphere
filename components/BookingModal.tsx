import React, { useState } from 'react';
import { Hostel, Booking } from '../types';
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface BookingModalProps {
  hostel: Hostel | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (booking: Booking) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hostel, isOpen, onClose, onBook }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('6 Months');

  if (!isOpen || !hostel) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Create booking object
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      hostelId: hostel.id,
      hostelName: hostel.name,
      studentName: name,
      email: email,
      phoneNumber: phone,
      moveInDate: date,
      duration: duration,
      submittedAt: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
      onBook(newBooking);
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setDuration('6 Months');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-800">
            {step === 'success' ? 'Booking Confirmed' : `Book ${hostel.name}`}
          </h3>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
                  placeholder="John Doe" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
                    placeholder="+91 98765..." 
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                   <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
                    placeholder="john@uni.edu" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-in Date</label>
                  <input 
                    required 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  >
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 p-3 bg-brand-50 rounded-lg border border-brand-100 flex justify-between items-center">
                <span className="text-sm text-brand-700 font-medium">Total Price (Monthly)</span>
                <span className="text-lg font-bold text-brand-700">{hostel.currency} {hostel.pricePerMonth}</span>
              </div>

              <button type="submit" className="w-full mt-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-brand-500/30">
                Confirm Booking
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
              <p className="text-slate-600 font-medium">Processing your request...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Booking Successful!</h4>
                <p className="text-slate-500 mt-2 text-sm">We have received your details. The property manager will contact you at {phone} shortly.</p>
              </div>
              <button onClick={handleClose} className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
