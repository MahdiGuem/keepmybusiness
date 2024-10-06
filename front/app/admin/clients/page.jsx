'use client';

import { useState, useEffect } from 'react';

export default function ClientTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editClient, setEditClient] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    birthdate: "",
    personalEmail: "",
    businessEmail: "",
    about: ""
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:8080/client", { cache: "no-cache" });
      const data = await res.json();
      setClients(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
  setEditClient(client.id);
  setFormData(client);
};

const handleDelete = (id) => {
  setClientToDelete(id);
  setModalVisible(true);
};

const confirmDelete = async () => {
  try {
    await fetch(`http://localhost:8080/client/delete/${clientToDelete}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      method: 'DELETE'
    });
    setClients(clients.filter(client => client.id !== clientToDelete));
    setModalVisible(false);
    setClientToDelete(null);
  } catch (error) {
    console.error('Error deleting client:', error);
  }
};

const cancelDelete = () => {
  setModalVisible(false);
  setClientToDelete(null);
};

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch(`http://localhost:8080/client`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      method: 'POST',
      body: JSON.stringify(formData),
    });
    setClients((prevClients) => prevClients.map((client) =>
      client.id === editClient ? formData : client
    ));
    setEditClient(null);
    setFormData({
      id: "",
      fullName: "",
      birthdate: "",
      personalEmail: "",
      businessEmail: "",
      about: ""
    });
  } catch (error) {
    console.error('Error editing client:', error);
  }
};

const handleCancel = () => {
  setEditClient(null);
  setFormData({
    id: "",
    fullName: "",
    birthdate: "",
    personalEmail: "",
    businessEmail: "",
    about: ""
  });
};

  return (
    <div className="p-4 mx-auto flex flex-col min-h-full">
      <div className='flex justify-between mb-4'>
        <h2 className="text-2xl font-bold">Client List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-72"
        />
      </div>

      {loading ? (
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
          <div className="flex-1">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="client_header" onClick={() => handleSort('id')}>Client ID</th>
                  <th className="client_header" onClick={() => handleSort('fullName')}>Full Name</th>
                  <th className="client_header" onClick={() => handleSort('birthdate')}>Birthdate</th>
                  <th className="client_header" onClick={() => handleSort('personalEmail')}>Personal Email</th>
                  <th className="client_header" onClick={() => handleSort('businessEmail')}>Business Email</th>
                  <th className="client_header" onClick={() => handleSort('businessEmail')}>Password</th>
                  <th className="client_header">About</th>
                  <th className="client_header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map(client => (
                  <tr key={client.id}>
                    <td className="client_cell">{client.id}</td>
                    <td className="client_cell">{client.fullName}</td>
                    <td className="client_cell">{client.birthdate}</td>
                    <td className="client_cell">{client.personalEmail}</td>
                    <td className="client_cell">{client.businessEmail}</td>
                    <td className="client_cell">{client.password}</td>
                    <td className="client_cell">{client.about}</td>
                    <td className="client_cell text-center">
                      <button onClick={() => handleEdit(client)} className="text-primary-green hover:underline mr-2">Edit</button>
                      <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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

 {/* Edit Modal */}
      {editClient !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Edit Client: {formData.id}</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col space-y-4">
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
                value={formData.birthdate ? new Date(formData.birthdate).toISOString().slice(0, 10) : ''}
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
                rows={4}
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-primary-green text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Delete Client</h3>
            <p>Are you sure you want to delete this client?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded"
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