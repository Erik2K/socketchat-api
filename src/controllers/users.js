import UserModel from '../models/user.js'

export class UserController {
  static async getAll (req, res) {
    UserModel.find({})
      .then((users) => {
        res.status(200).json(users)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static async getById (req, res) {
    const { userId } = req.params
    UserModel.findById(userId)
      .then((user) => {
        if (!user) return res.status(404).json('User not found')

        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static async create (req, res) {
    UserModel.create(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static async delete (req, res) {
    const { userId } = req.params
    UserModel.deleteOne({ _id: userId })
      .then((status) => {
        if (!status.deletedCount) return res.status(404).json('User not found')

        res.status(200).json(status)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

  static async search (req, res) {
    const { prompt } = req.params
    UserModel.find(
      {
        $or: [
          { username: { $regex: `.*${prompt}.*` } },
          { email: { $regex: `.*${prompt}.*` } }
        ]
      }
    )
      .limit(15)
      .then(users => {
        res.status(200).json(users)
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}
