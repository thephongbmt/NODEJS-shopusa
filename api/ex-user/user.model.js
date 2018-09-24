/*
    Use zombie data for model return a promise
    if use the other database implement it by your way (Nosql, sql)
*/
let users = [
  {
    name    : 'nguyen van a',
    email   : 'nguyenvana@gmail.com',
    phone   : '0909828929',
    gender  : 'Male',
    username: 'nguyenvana',
    password: '$2y$12$g/01cjDqJj.ebztR0x7zmuqIQ5kdLapXfxX10Zql3NrIYgeMUOGGy' //123123 encrypt by bcrypt
  },
  {
    name    : 'nguyen van b',
    email   : 'nguyenvanb@gmail.com',
    phone   : '0909828929',
    gender  : 'Male',
    username: 'nguyenvanb',
    password: '$2y$12$g/01cjDqJj.ebztR0x7zmuqIQ5kdLapXfxX10Zql3NrIYgeMUOGGy' //123123 encrypt  by bcrypt
  }
];

export const getUserModel = () => {
  try {
    return new Promise(resolve => resolve(users));
  } catch (err) {
    throw err;
  }
};

export const findUserByEmailAndPassWordModel = user => {
  try {
    let userDb = users.find(u => {
      u.email = user.email;
      u.password = user.password;
    });
    return new Promise(resolve => resolve(userDb));
  } catch (err) {
    throw err;
  }
};
