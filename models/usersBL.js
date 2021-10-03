const dal = require('../DAL/fileReader');
var path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'users.json');

let users;

initData();

async function initData() {
  try {
    const data = await dal.readDataFromFile(filePath);
    users = new Map(Object.entries(data));
  } catch (err) {
    console.error(err.message);
  }
}

exports.getUser = function (id) {
  return users.has(id) ? { status: 200, data: { [id]: users.get(id) } } : { status: 404, data: 'User does not exist' };
}

exports.getUsers = function () {
  const res = new Map();
  users.forEach((value, key) => {
    const obj = {};
    obj.name = value.name;
    obj.favorite_color = value.favorite_color;
    res.set(key,obj)
  });
  return Object.fromEntries(res);
}