const deleteAllNotifications = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/notifications`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default deleteAllNotifications;