/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw,
  Mail,
  User,
  Building2,
  Clock,
  ArrowRight,
  Lock,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  ClipboardList,
  Info
} from 'lucide-react';

// --- Types ---

interface EventData {
  name: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  totalTickets: number;
}

interface Booking {
  userName: string;
  userEmail: string;
  userDept: string;
  ticketsBooked: number;
  totalAmount: number;
  bookingId: string;
  timestamp: string;
}

interface UserAuth {
  email: string;
  name: string;
  dept: string;
  role: 'user' | 'admin';
}

// --- Constants ---

const EVENT_DETAILS: EventData = {
  name: "TechNext 2026: AI & Robotics Seminar",
  department: "Department of Computer Science & Engineering",
  date: "May 15, 2026",
  time: "10:00 AM - 04:00 PM",
  venue: "Main Auditorium, Block C, 4th Floor",
  price: 250,
  totalTickets: 120,
};

// Global simulated database (re-initialized on refresh in this dev env)
const INITIAL_BOOKINGS: Booking[] = [
  { bookingId: "TK-A82J1", userName: "Sarah Miller", userEmail: "sarah.m@cs.edu", userDept: "Computer Science", ticketsBooked: 2, totalAmount: 500, timestamp: "2026-04-20 10:30" },
  { bookingId: "TK-K92P4", userName: "Robert Chen", userEmail: "r.chen@it.edu", userDept: "Information Tech", ticketsBooked: 1, totalAmount: 250, timestamp: "2026-04-21 14:15" },
  { bookingId: "TK-M11X9", userName: "Elena Rodriguez", userEmail: "elena@me.edu", userDept: "Mechanical Eng.", ticketsBooked: 3, totalAmount: 750, timestamp: "2026-04-22 09:05" },
];

// --- Components ---

const AdminDashboard = ({ bookings, available, total }: { bookings: Booking[], available: number, total: number }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.ticketsBooked, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="text-blue-600" /> Administrative Console
        </h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold uppercase tracking-widest">
          Live System Overview
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Sales</p>
            <p className="text-2xl font-bold">{totalTicketsSold} <span className="text-sm font-normal text-slate-400">Tickets</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Revenue Collected</p>
            <p className="text-2xl font-bold text-emerald-600 font-mono">â‚¹{totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Capacity</p>
            <p className="text-2xl font-bold">{available} <span className="text-sm font-normal text-slate-400">/ {total} Free</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-[0px]">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <ClipboardList size={18} className="text-slate-400" />
          <h3 className="font-bold text-sm">Recent Booking Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Attendee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Tickets</th>
                <th className="px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                    No bookings recorded in the system yet.
                  </td>
                </tr>
              ) : (
                [...bookings].reverse().map((b) => (
                  <tr key={b.bookingId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">{b.bookingId}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold">{b.userName}</div>
                      <div className="text-xs text-slate-400">{b.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{b.userDept}</td>
                    <td className="px-6 py-4 font-bold">{b.ticketsBooked}</td>
                    <td className="px-6 py-4 font-mono font-bold">â‚¹{b.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (user: UserAuth) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    // Simulate auth logic
    setTimeout(() => {
      const isAdmin = email.toLowerCase() === 'admin@university.edu';
      onLogin({
        email,
        name: isAdmin ? "System Administrator" : email.split('@')[0].replace('.', ' '),
        dept: isAdmin ? "Central Admin" : "Computer Science",
        role: isAdmin ? 'admin' : 'user'
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
      >
        <div className="bg-slate-900 p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Department Access</h2>
          <p className="text-slate-400 text-xs uppercase tracking-widest mt-2 font-bold italic underline-offset-4 decoration-blue-500 underline">Professional Portal</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">University Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="id@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Access Key</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1 bg-red-50 p-2 rounded-lg border border-red-100">
                <AlertCircle size={14} /> {error}
              </p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              {isLoading ? 'Authenticating...' : 'Secure Sign In'} <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </motion.div>

      {/* Login Information Helper */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 shadow-sm"
      >
        <div className="mt-0.5 text-blue-600 flex-shrink-0">
          <Info size={16} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-2 text-left">Simulated Access Info</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <p className="text-[9px] text-blue-700 font-bold uppercase mb-1">Standard Agent</p>
              <code className="text-[10px] font-mono text-blue-900 bg-white px-1.5 py-0.5 rounded border border-blue-200">user@example.com</code>
            </div>
            <div className="text-left">
              <p className="text-[9px] text-blue-700 font-bold uppercase mb-1">Administrator</p>
              <code className="text-[10px] font-mono text-blue-900 bg-white px-1.5 py-0.5 rounded border border-blue-200">admin@university.edu</code>
            </div>
          </div>
          <p className="text-[9px] text-blue-600 mt-2 font-medium italic text-left">Use any value for the password field.</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function App() {
  // Auth State
  const [user, setUser] = useState<UserAuth | null>(null);

  // System State (Database)
  const [allBookings, setAllBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [availableTickets, setAvailableTickets] = useState(
    EVENT_DETAILS.totalTickets - INITIAL_BOOKINGS.reduce((sum, b) => sum + b.ticketsBooked, 0)
  );

  // UI State
  const [form, setForm] = useState({
    name: '',
    email: '',
    dept: '',
    tickets: 1,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingSummary, setBookingSummary] = useState<Booking | null>(null);

  // Derived
  const totalPrice = useMemo(() => form.tickets * EVENT_DETAILS.price, [form.tickets]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'tickets' ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.dept.trim()) newErrors.dept = "Department is required";
    
    if (form.tickets <= 0) {
      newErrors.tickets = "Tickets must be positive";
    } else if (form.tickets > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} left`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newBooking: Booking = {
        userName: form.name,
        userEmail: form.email,
        userDept: form.dept,
        ticketsBooked: form.tickets,
        totalAmount: totalPrice,
        bookingId: `TK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
      };

      setAvailableTickets(prev => prev - form.tickets);
      setAllBookings(prev => [...prev, newBooking]);
      setBookingSummary(newBooking);
    }
  };

  const resetForm = () => {
    setBookingSummary(null);
    setForm({
      name: '',
      email: '',
      dept: '',
      tickets: 1,
    });
    setErrors({});
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <LoginPage onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 flex flex-col min-h-[640px]">
        {/* Header */}
        <header className="bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">Campus Management System</span>
            <h1 className="text-2xl font-bold tracking-tight">{EVENT_DETAILS.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 justify-center md:justify-end mb-0.5">
                <span className="block text-[10px] uppercase text-slate-500 font-bold tracking-wider">Authenticated</span>
                {user.role === 'admin' && (
                  <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase rounded tracking-tighter">Admin</span>
                )}
              </div>
              <span className="text-sm font-bold text-slate-200 capitalize">{user.name}</span>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
          {user.role === 'admin' ? (
            <div className="w-full overflow-y-auto">
              <AdminDashboard bookings={allBookings} available={availableTickets} total={EVENT_DETAILS.totalTickets} />
            </div>
          ) : (
            <>
              {/* User Side Panel: Event Details */}
              <section className="w-full md:w-5/12 border-r border-slate-100 bg-slate-50/50 p-8 flex flex-col justify-between gap-8">
                <div>
                  <div className="mb-8">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-4">
                      Limited Seating
                    </span>
                    <h2 className="text-xl font-bold mb-6 text-slate-900">Event Information</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-blue-600">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date & Time</span>
                          <span className="text-sm font-semibold">{EVENT_DETAILS.date} | {EVENT_DETAILS.time}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-blue-600">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Venue</span>
                          <span className="text-sm font-semibold">{EVENT_DETAILS.venue}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-blue-600">
                          <Ticket size={18} />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ticket Pricing</span>
                          <span className="text-sm font-semibold italic text-slate-900">
                            â‚¹{EVENT_DETAILS.price}.00 <span className="text-slate-400 not-italic font-normal">/ per attendee</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Capacity</span>
                      <span className="text-2xl font-bold text-blue-600 italic">
                        {availableTickets}<span className="text-xs text-slate-400 font-normal not-italic tracking-normal"> / {EVENT_DETAILS.totalTickets} left</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden text-[0px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(availableTickets / EVENT_DETAILS.totalTickets) * 100}%` }}
                        className="bg-blue-600 h-full rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                <footer className="text-[10px] text-slate-400 font-medium leading-relaxed">
                  For group bookings exceeding 5 tickets, please contact the department head directly. 
                  Cancellations are permitted until 48 hours prior to event start.
                </footer>
              </section>

              {/* User Interaction Area */}
              <section className="w-full md:w-7/12 p-8 md:p-10 flex flex-col bg-white overflow-y-auto text-[0px]">
                <AnimatePresence mode="wait">
                  {!bookingSummary ? (
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full text-sm"
                    >
                      <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900">Ticket Reservation</h2>
                        <p className="text-sm text-slate-500">Please fill in the details below to secure your place.</p>
                      </div>

                      <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div className="col-span-1 md:col-span-2">
                           <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5 tracking-wider">Full Name</label>
                           <div className="relative">
                             <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                              type="text" 
                              name="name"
                              value={form.name}
                              onChange={handleInputChange}
                              placeholder="John Doe" 
                              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all font-medium`}
                             />
                           </div>
                           {errors.name && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.name}</p>}
                        </div>

                        <div>
                           <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5 tracking-wider">Email Address</label>
                           <div className="relative">
                             <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                              type="email" 
                              name="email"
                              value={form.email}
                              onChange={handleInputChange}
                              placeholder="john@university.edu" 
                              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all font-medium`}
                             />
                           </div>
                           {errors.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.email}</p>}
                        </div>

                        <div>
                           <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5 tracking-wider">Department</label>
                           <div className="relative">
                             <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                             <select 
                              name="dept"
                              value={form.dept}
                              onChange={handleInputChange}
                              className={`w-full pl-9 pr-10 py-2.5 rounded-lg border ${errors.dept ? 'border-red-300 bg-red-50' : 'border-slate-300'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all bg-white font-medium appearance-none`}
                             >
                               <option value="">Select Dept</option>
                               <option value="Computer Science">Computer Science</option>
                               <option value="Mechanical Eng.">Mechanical Eng.</option>
                               <option value="Information Tech">Information Tech</option>
                               <option value="Civil Engineering">Civil Engineering</option>
                             </select>
                           </div>
                           {errors.dept && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.dept}</p>}
                        </div>

                        <div>
                           <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5 tracking-wider">No. of Tickets</label>
                           <div className="relative">
                             <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input 
                              type="number" 
                              name="tickets"
                              min="1" 
                              max={availableTickets}
                              value={form.tickets}
                              onChange={handleInputChange}
                              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border ${errors.tickets ? 'border-red-300 bg-red-50' : 'border-slate-300'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all font-medium`}
                             />
                           </div>
                           {errors.tickets && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.tickets}</p>}
                        </div>

                        <div className="flex items-end">
                           <button 
                             type="submit" 
                             disabled={availableTickets === 0}
                             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                           >
                             Book Tickets Now <ArrowRight size={16} />
                           </button>
                        </div>
                      </form>

                      <div className="mt-auto p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex justify-between items-center">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Current Summary</span>
                           <div className="text-lg font-bold text-slate-900">Total Amount: <span className="text-blue-600">â‚¹{totalPrice}.00</span></div>
                        </div>
                        <div className="text-right">
                           <button 
                            onClick={() => setForm({ name: '', email: '', dept: '', tickets: 1 })}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest cursor-pointer"
                           >
                             Reset Form
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirmation-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center text-sm"
                    >
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Reservation Successful</h3>
                      <p className="text-sm text-slate-500 mb-8 max-w-sm">
                        Thank you, <span className="font-bold text-slate-800">{bookingSummary.userName}</span>. Your booking for {bookingSummary.ticketsBooked} tickets has been confirmed.
                      </p>
                      
                      <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 mb-8 text-left">
                        <div className="flex justify-between text-xs border-b border-slate-200 pb-3">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Booking ID</span>
                          <span className="font-mono font-bold text-slate-900">{bookingSummary.bookingId}</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-slate-200 pb-3">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Department</span>
                          <span className="font-semibold text-slate-900">{bookingSummary.userDept}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold pt-1">
                          <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-1">Total Amount Paid</span>
                          <span className="text-lg text-blue-600 italic">â‚¹{bookingSummary.totalAmount}.00</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={resetForm}
                        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <RefreshCcw size={16} /> Book for Someone Else
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
