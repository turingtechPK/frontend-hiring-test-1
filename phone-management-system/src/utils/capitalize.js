export const capitalize = (name) => {
  if (name === name?.toUpperCase()) {
    const res = name?.toLowerCase();
    return res?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }
  return name?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};
