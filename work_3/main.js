const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

const [, , optins] = process.argv;

async function main() {
  const products = await fs.readFile(filePath, 'utf-8');
  const parsedProducts = JSON.parse(products);

  console.log(parsedProducts);

  if (
    optins.toLocaleUpperCase() !== 'ASC' &&
    optins.toLocaleUpperCase() !== 'DESC'
  ) {
    console.log('Invalid command. Only "ASC" or "DESC" are allowed.');
    return;
  }

  const sortedProducts = parsedProducts.sort((a, b) => {
    if (optins.toLocaleUpperCase() === 'ASC') {
      return a.price - b.price;
    } else if (optins.toLocaleUpperCase() === 'DESC') {
      return b.price - a.price;
    }
  });

  // await fs.writeFile(filePath, JSON.stringify(sortedProducts));
  console.log(sortedProducts);
}
main();
