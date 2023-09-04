// PANGGIL CONFIG BUAT SEQUELIZE NYA
const { DataTypes, Sequelize } = require('sequelize')
const { sequelize } = require('../config')
const { Op } = Sequelize

// BIKIN CLASS UNTUK NYIMPAN MODEL NYA
class UserModel {
  #model = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    audio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'user',
    underscored: true,
    updatedAt: true
  })

  // insert data
  async insertData (email, username, password) {
    try {
      const insertData = await this.#model.create({ email, username, password })
      return insertData
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get data by username
  async getData (username) {
    try {
      const data = await this.#model.findOne({
        where: {
          username
        },
        attributes: ['username', 'password', 'id'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get data by id
  async getDataByPk (userId) {
    try {
      const data = await this.#model.findByPk(userId, {
        attributes: ['username', 'password', 'id'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get data by email
  async getDataByEmail (email) {
    try {
      const data = await this.#model.findOne({
        where: {
          email
        },
        attributes: ['username', 'password', 'id'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get the model
  async getModel () {
    return this.#model
  }

  // update data by id
  async updateData (id, username, email) {
    try {
      await this.#model.update({
        username,
        email,
        updatedAt: Sequelize.literal('NOW()')
      },
      { where: { id } }
      )
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get avatar by either id or username
  async getAvatar (id, username) {
    try {
      const data = await this.#model.findOne({
        where: {
          [Op.or]: [
            { id },
            { username }]
        },
        attributes: ['avatar'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // save avatar by id
  async saveAvatar (id, avatarUrl) {
    try {
      await this.#model.update({
        avatar: avatarUrl,
        updatedAt: Sequelize.literal('NOW()')
      },
      { where: { id } }
      )
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // save video by id
  async saveVideo (id, video) {
    try {
      await this.#model.update({
        video,
        updatedAt: Sequelize.literal('NOW()')
      }, {
        where: { id }
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get video berdasarkan id
  async getVideo (id) {
    try {
      const data = await this.#model.findOne({
        where: { id },
        attributes: ['video'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // save audio by id
  async saveAudio (id, audio) {
    try {
      await this.#model.update({
        audio,
        updatedAt: Sequelize.literal('NOW()')
      }, {
        where: { id }
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get audio berdasarkan id
  async getAudio (id) {
    try {
      const data = await this.#model.findOne({
        where: {
          id
        },
        attributes: ['audio'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

// EXPORTS MODEL NYA
const userModel = new UserModel()
module.exports = { userModel }
