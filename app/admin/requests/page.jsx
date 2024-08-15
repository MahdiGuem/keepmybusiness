'use client';

import { useState } from 'react';

const initialRequestsData = [
  { clientID: 12, fullName: "Samuel Adams", birthdate: "1982-02-12", personalEmail: "samuel@example.com", businessEmail: "samuel.adams@business.com", about: "New request" },
  { clientID: 13, fullName: "Nina West", birthdate: "1990-04-22", personalEmail: "nina@example.com", businessEmail: "nina.west@business.com", about: "New request" },
  // Add more requests as needed
];

export default function RequestsTable({ clients, setClients }) {
  const [requests, setRequests] = useState(initialRequestsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);

  // Pagination
  const totalPages = Math.ceil(requests.length / requestsPerPage);
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleApprove = (request) => {
  };
  const handleDelete = (clientID) => {
  };

  const sendConfirmationEmail = (email) => {
  };

  return (
    <div className="p-4 max-w-5xl mx-auto flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Client Requests</h2>

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
            {currentRequests.map(request => (
              <tr key={request.clientID}>
                <td className="client_cell">{request.clientID}</td>
                <td className="client_cell">{request.fullName}</td>
                <td className="client_cell">{request.birthdate}</td>
                <td className="client_cell">{request.personalEmail}</td>
                <td className="client_cell">{request.businessEmail}</td>
                <td className="client_cell">{request.about}</td>
                <td className="client_cell text-center">
                  <button onClick={() => handleApprove(request)} className="text-primary-green hover:underline mr-2">Approve</button>
                  <button onClick={() => handleDelete(request.clientID)} className="text-red-500 hover:underline">Delete</button>
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
    </div>
  );
}
