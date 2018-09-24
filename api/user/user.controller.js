import {
  findAllUser,
  findUserBy,
  insertUser,
  updateUser
} from './user.service';

export const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await findUserBy(id);
    res.SUCCESS(user);
  } catch (err) {
    res.ERROR(err.message);
  }
};

export const insert = async (req, res) => {
  try {
    let data = req.body;
    let userRequest = {
      email      : data.email,
      fullname   : data.fullname,
      dateOfBirth: data.dateOfBirth,
      password   : data.password,
      social     : data.social,
      phone      : data.phone,
      avatar     : data.avatar,
      description: data.description
    };
    let id = await insertUser(userRequest);
    res.SUCCESS(id);
  } catch (err) {
    res.ERROR(err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    let params = req.query;
    let condtion = {
      fullname   : params.fullname,
      dateOfBirth: params.dateOfBirth,
      phone      : params.phone,
      email      : params.email
    };
    let pageSize = params.pageSize;
    let page = params.page;
    let sortBy = params.sort;
    let user = await findAllUser(condtion, { page, pageSize, sortBy });

    res.SUCCESS(user);
  } catch (err) {
    res.ERROR(err.message);
  }
};

export const update = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let userRequest = {
      email      : data.email,
      fullname   : data.fullname,
      dateOfBirth: data.dateOfBirth,
      password   : data.password,
      social     : data.social,
      phone      : data.phone,
      avatar     : data.avatar,
      description: data.description
    };
    let user = await updateUser(id, userRequest);
    res.SUCCESS(user);
  } catch (err) {
    res.ERROR(err.message);
  }
};
