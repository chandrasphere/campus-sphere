import React from 'react';
import { Booking } from '../types';
import { Calendar, Phone, Mail, User, Home, Clock } from 'lucide-react';

interface AdminDashboardProps {
  bookings: Booking[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage and view all student accommodation requests.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
          <span className="text-slate-500 font-medium text-sm">Total Bookings:</span>
          <span className="ml-2 text-2xl font-bold text-brand-600">{bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No bookings yet</h3>
          <p className="text-slate-500 mt-2">Student bookings will appear here once they are submitted.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking Info</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mr-3">
                          <Home size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{booking.hostelName}</p>
                          <p className="text-xs text-slate-500">ID: {booking.hostelId.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-slate-900 font-medium">
                          <User size={14} className="mr-2 text-slate-400" />
                          {booking.studentName}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Phone size={14} className="mr-2 text-slate-400" />
                          {booking.phoneNumber}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Mail size={14} className="mr-2 text-slate-400" />
                          {booking.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-slate-700">
                          <span className="text-slate-500 w-20 text-xs uppercase mr-1">Move In:</span>
                          <span className="font-medium">{booking.moveInDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-700">
                          <span className="text-slate-500 w-20 text-xs uppercase mr-1">Duration:</span>
                          <span className="font-medium">{booking.duration}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center text-sm text-slate-500">
                         <Clock size={14} className="mr-1.5" />
                         {new Date(booking.submittedAt).toLocaleDateString()}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New Request
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
