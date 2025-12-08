import { useState, useEffect, useCallback } from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useGetAllComplaints, useUpdateComplaintStatus } from "../../api/useProjectPulseApi";

interface Complaint {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
}

export default function Complaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [fetchComplaints, fetchState] = useGetAllComplaints();
  const [updateStatus] = useUpdateComplaintStatus();

  const loadComplaints = useCallback(async (token: string) => {
    try {
      const data = await fetchComplaints(token);
      setComplaints(data.complaints || data || []);
    } catch {
      setError("Failed to load complaints. Please try again later.");
    }
  }, [fetchComplaints]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode token to check role
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      const role = decoded.roles || decoded.role;
      const normalizedRole = String(role || '').toLowerCase();

      if (!normalizedRole.includes('admin')) {
        navigate('/dashboard');
        return;
      }

      queueMicrotask(() => {
        loadComplaints(token);
      });
    } catch {
      queueMicrotask(() => {
        setError("Failed to verify permissions");
      });
    }
  }, [navigate, loadComplaints]);

  const updateComplaintStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await updateStatus(id, status, token);
      
      // Update local state
      setComplaints(complaints.map(c => 
        c.id === id ? { ...c, status } : c
      ));
      if (selectedComplaint?.id === id) {
        setSelectedComplaint({ ...selectedComplaint, status });
      }
    } catch {
      setError("Failed to update complaint status");
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        {/* Header with Blue Banner */}
        <div className="bg-blue-700 rounded-t-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-blue-100">View and manage all contact form submissions</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-8 md:p-12">
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Messages</label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {fetchState.loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              <p className="mt-4 text-gray-600">Loading messages...</p>
            </div>
          )}

          {/* Error State */}
          {error && !fetchState.loading && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Complaints List */}
          {!fetchState.loading && !error && (
            <>
              {/* Stats */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredComplaints.length}</span> of <span className="font-semibold text-gray-900">{complaints.length}</span> messages
                </p>
              </div>

              {/* Messages Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredComplaints.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-lg font-medium">No messages found</p>
                    <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <div 
                      key={complaint.id} 
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition cursor-pointer"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {complaint.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{complaint.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{complaint.email}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(complaint.status)} flex-shrink-0 ml-2`}>
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                        {complaint.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(complaint.created_at)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Message Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-700 p-6 rounded-t-xl flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Message Details</h2>
                <p className="text-blue-100 text-sm">{formatDate(selectedComplaint.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-white hover:bg-blue-600 rounded-lg p-2 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Sender Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">Sender Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-900 font-medium">{selectedComplaint.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${selectedComplaint.email}`} className="text-blue-700 hover:underline">{selectedComplaint.email}</a>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedComplaint.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['new', 'in-progress', 'resolved', 'closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateComplaintStatus(selectedComplaint.id, status)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        selectedComplaint.status === status
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <a
                  href={`mailto:${selectedComplaint.email}?subject=Re: Your message to Project Pulse&body=Hi ${selectedComplaint.name},%0D%0A%0D%0A`}
                  className="flex-1 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold text-center"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
