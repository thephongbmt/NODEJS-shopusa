import _ from 'lodash';
import userModel from './user.model';

export const findUserBy = async filter => {
  try {
    let clearUndefinedPros = _.pickBy(filter, e => e !== undefined);
    return await userModel.findOne(clearUndefinedPros);
  } catch (err) {
    throw err;
  }
};
export const findAllUser = async (
  filter,
  option = { pageSize: 10, page: 1, sortBy: { _id: 'desc' } }
) => {
  let skip = option.pageSize * (option.page - 1);
  return await userModel
    .find(filter)
    .sort(option.sortBy)
    .skip(skip)
    .limit(option.pageSize);
};

export const insertUser = async user => {
  return await userModel.create(user);
};

export const updateUser = async (id, user) => {
  try {
    return await userModel.update({ _id: id }, user, { multi: false });
  } catch (err) {
    throw err;
  }
};
