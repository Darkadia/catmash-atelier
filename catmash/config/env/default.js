'use strict'

module.exports = {
  db: {
    dbUri: 'mongodb://' + (process.env.DB_URI || 'localhost') + '/catmash' + (process.env.AUTH || ''),
    options: {
      user: process.env.USER || '',
      pass: process.env.MDP || ''
    },
  },
  secretOrKey : "Catmash application test",
  jwtSecret : "Catmash is an amazing application"
};
