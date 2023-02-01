const { Op } = require('sequelize');
const models = require('../../database/models');

const getAllUsers = async () => {
  const users = await models.User.findAll({
    where: {
      role: {
        [Op.or]: ['seller', 'customer'],
      },
    },
  });
  if (!users) {
    return { type: 404, message: { message: 'No users found' } };
  }
  const newUser = users.map((user) => {
    const { dataValues } = user;
    const { password: _, ...userWithoutPass } = dataValues;
    return userWithoutPass;
  });
  return { type: 200, message: newUser };
};

module.exports = { getAllUsers };