import db from '../../models'
import { Sequelize } from '../../models'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const node_env = process.env.NODE_ENV || 'development'
const config = require('../../config').config

class AuthController {
  static Login(req, res) {
    const { body } = req
    console.log(db.User);
    db.User.findOne({
        where: {
          email: body.email
        }
      }).then(user => {
        if (!user) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        // Crear un token
        // expira en 4hs
        user.password = ':P'
        const token = jwt.sign({ user: user }, config.authJwtSecret, { expiresIn: 14400 })
        const { roles } = user; 
        res.status(200).json({
          ok: true,
          user,
          roles,
          token,
          id: user.id
        })
      })
      .catch(err => {
        res.status(400).json({ message: 'issues trying to connect to database' + err, err })
      })
  }
}

export default AuthController

