/* eslint no-console: [2, { allow: ["log", "warn", "error"] }] */
import Sequelize from 'sequelize';
import db from '../modules/index.js';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import utils from '../../config/utils';

// options = { email: email, password: password }
const createUser = (email, password) =>
  db.User.findOrCreate({ where: { email } })
    .spread((user, created) => {
      return created ? user.setPassword(password) : false;
    })
    .catch((error) => console.log('Error creating user: ', error));

const updateUser = (id, data) =>
  db.User.update(data, { where: { id } })
    .catch(err => console.log(err));

const getAllUsers = () =>
  db.User.findAll()
    .catch((error) => console.error('Error retrieving users. ', error));

// options = {username: username}
const getUser = (options) =>
  db.User.findOne({ where: options })
    .catch((error) => console.error('Error retrieving user. ', error));

const verifyUser = (usernameOrEmail, password) =>
  db.User.findOne({
    where: {
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    },
  })
  .then(user => user && user.verifyPassword(password) ? user : false)

const crossReference = (emails, phoneNumbers) =>
  db.User.find({
    where: {
      $or: [
        { email: { $in: emails } },
        { phoneNumber: { $in: phoneNumbers } },
      ],
    },
  }).then(user => user ? user.get('id') : null)

// status 0 = pending me
// status 1 = pending others
// status 2 = done
function reduceQuilts(userQuilts) {
  return userQuilts.map(userQuilt => ({
    id: userQuilt.get('id'),
    theme: userQuilt.get('theme'),
    status: userQuilt.get('UserQuilt').get('status') + userQuilt.get('status'),
  })).reverse();
}

// options = {username: username}
const getAllUserQuilts = (username) =>
  getUser({ username })
    .then(user => user.getQuilts())
    .then(reduceQuilts)
    .catch(error => console.error('Error retrieving user\'s quilts: ', error));

const getQuilt = (options) => (
  db.Quilt.findOne({ where: options })
    .catch((error) => console.error('Error retrieving quilt: ', error))
);

const addFriends = (userId, friendIds) => {
  let currentUser;
  return db.User.findById(userId).then(user => {
    currentUser = user;
    return db.User.findAll({
      where: {
        id: {
          $in: friendIds,
        },
      },
    });
  }).then(friends => {
    // for some reason, sequelize isn't giving an addFriends method for user
    return Sequelize.Promise.map(friends, friend => currentUser.addFriend(friend))
  }).catch(err => console.log(err));
}

const postQuilt = (options) => {
  let newQuilt;
  return db.Quilt.create(_.pick(options, ['title', 'theme']))
    .then((quilt) => {
      newQuilt = quilt;
      return getUser({ username: options.creator.username });
    })
    .then(user => newQuilt.addUser(user, { status: 1 }))
    .then(() => (
      db.User.findAll({
        where: {
          id: {
            $in: options.users,
          },
        },
      })
    ))
    .then(users => newQuilt.addUsers(users, { status: 0 }))
    .then(() => newQuilt.id)
    .catch((error) => console.error('Error posting a quilt. ', error))
};

const updateUserQuiltStatus = (userId, quiltId) => {
  return getUser({ id: userId }).then((user) => {
    return getQuilt({ id: quiltId })
      .then(quilt => quilt.setUsers(user, { status: 1 }));
  }).then(() => quiltId);
};

const getAllOtherUsers = (username) =>
  db.User.findAll({
    where: {
      $not: {
        username,
      },
    },
  }).then((users) => users)
    .catch((error) => console.error('Error retreiving users. ', error));

export default {
  addFriends,
  createUser,
  crossReference,
  getAllUsers,
  getAllOtherUsers,
  getUser,
  getAllUserQuilts,
  getQuilt,
  postQuilt,
  updateUser,
  updateUserQuiltStatus,
  verifyUser,
}
