'use client';

import { handleRequestApprove } from '@app/actions';
import { useState, useEffect } from 'react';

export default function RequestsTable() {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch requests from backend
  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:8080/request');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false); // Stop loading after fetch is done
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch data on component mount
  }, []);

  // Update current page requests whenever requests or currentPage changes
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const totalPages = Math.ceil(requests.length / requestsPerPage);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleApprove = async (requestId) => {
    try {
      await handleRequestApprove(requestId);
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await fetch(`http://localhost:8080/request/delete/${requestId}`, { method: 'DELETE' });
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Client Requests</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
        {/* Loading Spinner */}
        <svg className="animate-spin h-8 w-8 text-primary-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span className="ml-2 text-lg">Loading...</span>
      </div>
      ) : (
        <>
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="client_header">Client ID</th>
                  <th className="client_header">Full Name</th>
                  <th className="client_header">Birthdate</th>
                  <th className="client_header">Personal Email</th>
                  <th className="client_header">Business Email</th>
                  <th className="client_header">About</th>
                  <th className="client_header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="client_cell">{request.id}</td>
                    <td className="client_cell">{request.fullName}</td>
                    <td className="client_cell">{request.birthdate}</td>
                    <td className="client_cell">{request.personalEmail}</td>
                    <td className="client_cell">{request.businessEmail}</td>
                    <td className="client_cell">{request.about}</td>
                    <td className="client_cell text-center">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-primary-green hover:underline mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-center items-center">
            <button
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-500 text-white rounded ml-2 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
