import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mohammed Essam",
    email: "mohammed@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shaimaa Nagah",
    email: "shaimaa@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "New Admin",
    email: "admin2@example.com",
    password: bcrypt.hashSync("123456789", 10),
    isAdmin: true,
  },
];

export default users;
