const fs = require('fs/promises');
const path = require('path');
const [, , optins, email, name, age] = process.argv;

const filePath = path.join(__dirname, 'users.json');

// console.log(path, 'path');
// console.log(__dirname, 'dirname');

// console.log(filePath);

async function AddUser(email, name, age) {
  const users = await fs.readFile(filePath, 'utf-8');
  const parsedUsers = JSON.parse(users);

  const activeEmail = parsedUsers.filter((item) => item.email === email);

  //   console.log(activeEmail);
  //   console.log(activeEmail, 'es is aris');

  if (activeEmail.length !== 0) {
    console.log('Email already in use');
  } else {
    const user = {
      email: email,
      name: name,
      age: age,
    };
    parsedUsers.push(user);
    await fs.writeFile(filePath, JSON.stringify(parsedUsers));
    console.log('email add succesfully');
  }
}

async function DelateUser(email) {
  const users = await fs.readFile(filePath, 'utf-8');
  const parsedUsers = JSON.parse(users);

  const stayedUsers = parsedUsers.filter((item) => item.email !== email);

  if (stayedUsers.length === parsedUsers.length) {
    console.log('this email not found');
  } else {
    await fs.writeFile(filePath, JSON.stringify(stayedUsers));
    console.log('email delete succesfully');
  }
}

async function main() {
  //   console.log(optins, email, name, age);

  if (optins.toLocaleUpperCase() === 'CREATE') {
    if (!email || !name || !age) {
      console.log('not enough info');
    } else {
      await AddUser(email, name, age);
    }
  } else if (optins.toLocaleUpperCase() === 'DELETE') {
    if (!email) {
      console.log('we need email tu delate your acc');
    } else {
      await DelateUser(email);
    }
  } else {
    console.log('use create or delate comand');
  }
}
main();
