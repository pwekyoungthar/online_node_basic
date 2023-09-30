module.exports = (temp, repVal) => {
  let output = temp.replace(/{%PRODUCTIMAGE%}/g, repVal.image);
  output = output.replace(/{%PRODUCTNAME%}/g, repVal.title);
  output = output.replace(/{%PRICE%}/g, repVal.price);
  output = output.replace(/{%ID%}/g, repVal.id);

  return output;
};
