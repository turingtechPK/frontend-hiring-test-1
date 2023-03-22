export const usePostAPI = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
