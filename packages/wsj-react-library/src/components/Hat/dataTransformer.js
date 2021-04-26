const dataTransformer = (hatData) => {
  const { djLinks = [] } = hatData.find((obj) => obj.djLinks) || {};
  const { ncLinks = [] } = hatData.find((obj) => obj.ncLinks) || {};
  return { djLinks, ncLinks };
};

export default dataTransformer;
