const { sequelize } = require("../models");
const { Op, Transaction } = require("sequelize");

const db = require("../models/index");
const { hashPassword, hashMatch } = require("../lib/hash");
const users = db.users;
const bus = db.bus;
const booking = db.booking;

module.exports = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      // get value from body
      let { username, email, password, role } = req.body;

      // check existing username
      let existUsername = await users.findOne({
        where: {
          username,
        },
      });

      if (existUsername) {
        return res.status(404).send({
          isError: true,
          message: "username already taken",
          data: null,
        });
      }

      // check existing email
      let existEmail = await users.findOne({
        where: {
          email,
        },
      });

      if (existEmail) {
        return res.status(404).send({
          isError: true,
          message: "email already registered",
          data: null,
        });
      }

      // check password eligibility. alnum + 6-10 char
      if (
        !password.match(
          /^(?=.*[a-zA-Z])(?=.*[0-9])/ ||
            password.length < 6 ||
            password.length > 10
        )
      ) {
        return res.status(404).send({
          isError: true,
          message:
            "password must contain at least 1 number and 1 alphabet, and needs to be 6-10 character long",
          data: null,
        });
      }

      // insert data to users table
      let insertUser = await users.create({
        username,
        email,
        password: await hashPassword(password),
        role
      }, {transaction: t})

      // send response
      await t.commit()
      res.status(201).send({
        isError: false,
        message: 'Register success',
        data: null
      })

    } catch (error) {
      console.log(error);
    }
  },
};
