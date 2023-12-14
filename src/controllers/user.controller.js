import UserModel from '../models/user.js'

export class UserController {
  static async getAll (req, res) {
    UserModel.find({})
      .then((users) => {
        res.status(200).json(users)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static async getById (req, res) {
    const { id } = req.params
    UserModel.findById(id)
      .then((user) => {
        if (!user) return res.status(404).json('User not found')

        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static async create (req, res) {
    UserModel.create(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static async delete (req, res) {
    const { id } = req.params
    UserModel.deleteOne({ _id: id })
      .then((status) => {
        if (!status.deletedCount) return res.status(404).json('User not found')

        res.status(200).json(status)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }
}
