import { Request, Response, NextFunction } from 'express'
import ApiError from '../exceptions/api-error'
import tokenService from '../service/token-service'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization
    let accessToken = null
    let userTokenData = null
    if (authorizationHeader) {
      accessToken = authorizationHeader.split(' ')[1]
      if (accessToken) {
        userTokenData = tokenService.validateAccessToken(accessToken)
      }
    }
    if (!authorizationHeader || !accessToken || !userTokenData) {
      return next(ApiError.UnauthorizedError())
    }
    // req.user = userTokenData
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}
