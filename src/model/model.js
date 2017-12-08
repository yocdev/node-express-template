const mongoose = require('mongoose')
const moment = require('moment')

const modelTransformers = {
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      delete ret.scope

      for (const key of Object.keys(ret)) {
        if (ret[key] instanceof Date) {
          ret[key] = ret[key].getTime()
        }
      }
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      delete ret.scope

      for (const key of Object.keys(ret)) {
        if (ret[key] instanceof Date) {
          ret[key] = ret[key].getTime()
        }
      }
    }
  }
}

function model(name, fields, config) {
  const schema = new mongoose.Schema(Object.assign(fields, {
    createdAt: { type: Date, default: () => moment().valueOf() },
    updatedAt: { type: Date, default: () => moment().valueOf() }
  }), modelTransformers)

  schema.pre('save', function (next) {
    this.updatedAt = moment().valueOf()
    next()
  })

  if (config) {
    config(schema)
  }

  return mongoose.model(name, schema)
}

module.exports = model
