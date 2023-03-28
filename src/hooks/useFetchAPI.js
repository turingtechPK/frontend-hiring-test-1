export const useFetchAPI = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
