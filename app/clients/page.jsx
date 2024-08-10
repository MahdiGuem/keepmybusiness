'use client';

import { useState } from 'react';

const initialClientsData = [
  { clientID: 1, fullName: "John Doe", birthdate: "1990-01-01", personalEmail: "john@example.com", businessEmail: "john.doe@business.com", about: "A valuable client" },
  { clientID: 2, fullName: "Jane Smith", birthdate: "1985-02-15", personalEmail: "jane@example.com", businessEmail: "jane.smith@business.com", about: "Another valuable client" },
  { clientID: 3, fullName: "Alice Johnson", birthdate: "1992-05-20", personalEmail: "alice@example.com", businessEmail: "alice.johnson@business.com", about: "Client 3" },
  { clientID: 4, fullName: "Bob Brown", birthdate: "1980-09-15", personalEmail: "bob@example.com", businessEmail: "bob.brown@business.com", about: "Client 4" },
  { clientID: 5, fullName: "Charlie Davis", birthdate: "1987-12-30", personalEmail: "charlie@example.com", businessEmail: "charlie.davis@business.com", about: "Client 5" },
  { clientID: 6, fullName: "David Evans", birthdate: "1991-03-11", personalEmail: "david@example.com", businessEmail: "david.evans@business.com", about: "Client 6" },
  { clientID: 7, fullName: "Emily White", birthdate: "1988-06-22", personalEmail: "emily@example.com", businessEmail: "emily.white@business.com", about: "Client 7" },
  { clientID: 8, fullName: "Frank Black", birthdate: "1995-08-17", personalEmail: "frank@example.com", businessEmail: "frank.black@business.com", about: "Client 8" },
  { clientID: 9, fullName: "Grace Green", birthdate: "1989-11-05", personalEmail: "grace@example.com", businessEmail: "grace.green@business.com", about: "Client 9" },
  { clientID: 10, fullName: "Henry King", birthdate: "1984-07-28", personalEmail: "henry@example.com", businessEmail: "henry.king@business.com", about: "Client 10" },
  { clientID: 11, fullName: "Ivy Lee", birthdate: "1993-12-10", personalEmail: "ivy@example.com", businessEmail: "ivy.lee@business.com", about: "Client 11" },
];

export default function ClientTable() {
  const [clients, setClients] = useState(initialClientsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editClient, setEditClient] = useState(null);
  const [formData, setFormData] = useState({
    clientID: "",
    fullName: "",
    birthdate: "",
    personalEmail: "",
    businessEmail: "",
    about: ""
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Sorting
  const sortedClients = [...clients].sort((a, b) => {
    if (sortConfig.key) {
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      return a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString(), undefined, { numeric: true }) * direction;
    }
    return 0;
  });

  // Filtering
  const filteredClients = sortedClients.filter((client) =>
    Object.values(client).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (client) => {
    setEditClient(client.clientID);
    setFormData(client);
  };

  const handleDelete = (clientID) => {
    setClientToDelete(clientID);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter(client => client.clientID !== clientToDelete));
    setModalVisible(false);
    setClientToDelete(null);
    setCurrentPage(1);
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setClientToDelete(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClient) {
      setClients(clients.map(client => client.clientID === editClient ? formData : client));
    } else {
      setClients([...clients, { ...formData, clientID: clients.length + 1 }]);
    }
    setEditClient(null);
    setFormData({
      clientID: "",
      fullName: "",
      birthdate: "",
      personalEmail: "",
      businessEmail: "",
      about: ""
    });
  };

  const handleCancel = () => {
    setEditClient(null);
    setFormData({
      clientID: "",
      fullName: "",
      birthdate: "",
      personalEmail: "",
      businessEmail: "",
      about: ""
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto flex flex-col min-h-screen">
        <div className='flex flex-between'>
            <h2 className="text-2xl font-bold mb-4">Client List</h2>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded w-72"
            />
        </div>
      

      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="client_header" onClick={() => handleSort('clientID')}>Client ID</th>
              <th className="client_header" onClick={() => handleSort('fullName')}>Full Name</th>
              <th className="client_header" onClick={() => handleSort('birthdate')}>Birthdate</th>
              <th className="client_header" onClick={() => handleSort('personalEmail')}>Personal Email</th>
              <th className="client_header" onClick={() => handleSort('businessEmail')}>Business Email</th>
              <th className="client_header">About</th>
              <th className="client_header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.clientID}>
                <td className="client_cell">{client.clientID}</td>
                <td className="client_cell">{client.fullName}</td>
                <td className="client_cell">{client.birthdate}</td>
                <td className="client_cell">{client.personalEmail}</td>
                <td className="client_cell">{client.businessEmail}</td>
                <td className="client_cell">{client.about}</td>
                <td className="client_cell text-center">
                  <button onClick={() => handleEdit(client)} className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(client.clientID)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-center items-center">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        
      </div>

      {editClient !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">{editClient ? 'Edit Client' : 'Add New Client'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="birthdate"
                placeholder="Birthdate"
                value={formData.birthdate}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="personalEmail"
                placeholder="Personal Email"
                value={formData.personalEmail}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="businessEmail"
                placeholder="Business Email"
                value={formData.businessEmail}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="about"
                placeholder="About"
                value={formData.about}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              ></textarea>
              <div className="flex justify-end space-x-4 mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  {editClient ? 'Update Client' : 'Add Client'}
                </button>
                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this client?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
