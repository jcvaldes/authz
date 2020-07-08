import db from '../../models'
import { Sequelize } from '../../models'
import RESPONSES from '../../utils/responses'
class UsersController {
  static Fetch(req, res) {
    const attrs = ['id', 'firstname', 'lastname', 'email', 'createdAt']
    db.User.findAll({
      attributes: attrs,
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) {
    const attrs = ['id', 'firstname', 'lastname', 'email']
    const id = +req.params.id
    db.User.findOne({
      where: {
        id,
      },
      attributes: attrs,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR,
          })
        } else {
          res.status(200).json({
            ok: true,
            user,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      })
  }
  static Create(req, res) {
    const { firstname, lastname, email, password, img } = req.body
    const active = true
    db.User.create({ firstname, lastname, email, password, img, active })
      .then((user) => {
        user.password = ':)'
        res.status(200).json(user)
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
}
export default UsersController
