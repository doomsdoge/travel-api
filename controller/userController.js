const { sequelize } = require("../models");
const { Op, Transaction } = require("sequelize");

const db = require("../models/index");
const { hashPassword, hashMatch } = require("../lib/hash");
const users = db.users;
const bus = db.bus;
const booking = db.booking;
const {createToken} = require('./../lib/jwt')

module.exports = {
  register: async (req, res) => {
    /* const t = await sequelize.transaction(); */
    try {
      // get value from body
      let { username, email, password, role } = req.body;

      // check password eligibility. alnum + 6-10 char
      if (
        !password.match(
          /^(?=.*[a-zA-Z])(?=.*[0-9])/
        ) ||
        password.length < 6 ||
        password.length > 10
      ) {
        return res.status(404).send({
          isError: true,
          message:
            "password must contain at least 1 number and 1 alphabet, and needs to be 6-10 character long",
          data: null,
        });
      }

      // insert data to users table
      await users.create({
        username,
        email,
        password: await hashPassword(password),
        role
      }/* , {transaction: t} */)

      // send response
      /* await t.commit() */
      res.status(201).send({
        isError: false,
        message: 'Register success',
        data: null
      })

    } catch (error) {
      res.status(404).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },

  login: async(req, res) => {
    try {
      // get value
        let {username_email, password} = req.query

        let findUsernameOrEmail = await users.findOne({
            where: {
                [Op.or]: [
                    {username: username_email},
                    {email: username_email}
                ]
            }
        })

        if(findUsernameOrEmail == null) {
          return res.status(404).send({
            isError: true, 
            message: 'Username or Email not found', 
            data: true
          })
        }

        let hasMatchResult = await hashMatch(password, findUsernameOrEmail.dataValues.password)
        
        if(hasMatchResult === false) {
          return res.status(404).send({
            isError: true, 
            message: 'Incorrect password', 
            data: true
        })
        }

        res.status(200).send({
            isError: false, 
            message: 'Login success', 
            data: {
                token: createToken({id: findUsernameOrEmail.dataValues.id})
            }
        })
        console.log(findUsernameOrEmail.dataValues)
    } catch (error) {
        res.status(404).send({
          isError: true,
          message: error.message,
          data: null
        })
    }
}
};
