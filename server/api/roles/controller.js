import db from '../../models'
import { Sequelize } from '../../models'
import RESPONSES from '../../utils/responses'
class RolesController {
  static Fetch(req, res) {
    const attrs = [
      'id',
      'name',
      'description',
      'active',
      'createdAt',
      'updatedAt',
    ]
    db.Role.findAll({
      attributes: attrs,
      order: [['id']]
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
    const attrs = ['id', 'name', 'description', 'active', 'createdAt']
    const id = +req.params.id
    db.Role.findOne({
      where: {
        id,
      },
      attributes: attrs,
    })
      .then((role) => {
        if (!role) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR,
          })
        } else {
          res.status(200).json({
            ok: true,
            role,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      })
  }
  static Create(req, res) {
    const body = req.body

    db.Role.create(body)
      .then((role) => {
        res.status(200).json(role)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static Update(req, res) {
    const body = req.body
    const id = +req.params.id
    db.Role.update(body, {
      where: {
        id,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res.status(404).json({
            ok: false,
            err: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        }
        res.status(201).json({
          ok: true,
          description: RESPONSES.UPDATE_SUCCESS.message,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Delete(req, res) {
    const id = +req.params.id
    db.Role.destroy({
      where: {
        id,
      },
    })
      .then((data) => {
        if (data === 0) {
          return res.status(404).json({
            ok: false,
            err: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        }
        res.status(200).json({
          ok: true,
          description: RESPONSES.DELETE_SUCCESS.message,
        })
      })
      .catch(db.Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
}
export default RolesController
