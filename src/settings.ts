import jwt from 'jsonwebtoken'

export type Settings = {
  port: number
  algorithm: jwt.Algorithm
  secretKey: string
  mongoDbConnection: string
}

const settings: Settings = {
  port: 8000,
  algorithm: 'HS256',
  secretKey: process.env.secretKey!,
  mongoDbConnection: process.env.mongoDbConnection!,
}

for (const key in settings) {
  if (!settings[key as keyof Settings]) {
    throw new Error(`Переменная окружения "${key}" не установлена`)
  }
}

export default settings
