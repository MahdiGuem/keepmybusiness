'use server';

export const handleRequestApprove = async (requestId) => {
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

    if (!response.ok) {
      throw new Error('Failed to approve request');
    }
  } catch (error) {
    console.error('Error approving request:', error);
  }
};
