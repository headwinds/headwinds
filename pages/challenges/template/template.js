const list = [{ name: "Hulk" }, { name: "Thor" }, { name: "Iron Man" }];

const getResult = () => {
  return list.find((item) => item.name === "Iron Man").name || "Not Found";
};

export default getResult;
