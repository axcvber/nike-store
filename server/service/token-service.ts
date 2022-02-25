import jwt from 'jsonwebtoken'
import { Token } from '../models/models'

interface ITokenPayload {
  id: number
  email: string
  iat?: number
  exp?: number
}

class TokenService {
  generateTokens(id: number, email: string) {
    const payload = { id, email }
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_KEY, { expiresIn: '30s' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' }) //right payload without {}
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ userId, refreshToken })
    return token
  }

  validateAccessToken(token: string) {
    try {
      const userTokenData = jwt.verify(token, process.env.JWT_ACCESS_KEY) as ITokenPayload
      return userTokenData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userTokenData = jwt.verify(token, process.env.JWT_REFRESH_KEY) as ITokenPayload
      return userTokenData
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ where: { refreshToken } })
    return tokenData
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({ where: { refreshToken } })
    return tokenData
  }
}

export default new TokenService()
