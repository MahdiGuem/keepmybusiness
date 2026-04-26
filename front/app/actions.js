'use server';


export const handleRequestApprove = async (requestId) => {
  console.log('handleRequestApprove called with:', requestId);
  try {
    const response = await fetch(`http://localhost:8080/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: requestId,
        newStatus: "approved",
      })
    });

    console.log('handleRequestApprove response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to approve request');
    }
    
    const data = await response.json();
    console.log('handleRequestApprove response data:', data);
    return data;
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

