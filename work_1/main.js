import fs from 'fs/promises';
import { json } from 'stream/consumers';

async function main() {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const res = await fetch(url);
  const data = await res.json();

  //   console.log(data);

  await fs.writeFile('posts.json', JSON.stringify(data));

  const readData = await fs.readFile('posts.json', 'utf-8');

  //   console.log(readData);

  const parsedData = JSON.parse(readData);

  //   console.log(parsedData);

  const filteredPosts = [];

  for (let item of parsedData) {
    // let arr = item.title.split('');
    // console.log(arr);
    if (item.title.split('').length < 30) {
      filteredPosts.push(item);
    }
  }

  await fs.writeFile('posts.json', JSON.stringify(filteredPosts));

  //   console.log(parsedData.length);
}
main();
