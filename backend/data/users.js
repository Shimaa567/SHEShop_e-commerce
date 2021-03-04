import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@exmaple.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Mohammed Essam',
    email: 'mohammed@exmaple.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Shaimaa Nagah',
    email: 'shaimaa@exmaple.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
