const dateCal = array => {
  return array.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
};

export default dateCal;
