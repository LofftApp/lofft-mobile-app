const dateCal = (array) => {
  const sortedPolls = array.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  console.log(sortedPolls)
}

export default dateCal;
