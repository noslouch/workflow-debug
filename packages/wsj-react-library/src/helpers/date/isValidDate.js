const isValidDate = (timestamp) => {
  const date = new Date(timestamp);
  return date instanceof Date && !Number.isNaN(date.valueOf());
};

export default isValidDate;
