import { Basket, User } from '../models/models'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import tokenService from './token-service'
import UserDto from '../dto/user-dto'
import MailService from './mail-service'
import ApiError from '../exceptions/api-error'

class UserService {
  async registration({ email, password, firstName, lastName, dateOfBirth, country, gender, subscribe }) {
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw ApiError.BadRequest('This email already exist')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()
    const user = await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      dateOfBirth,
      country,
      gender,
      subscribe,
      activationLink,
    })
    await Basket.create({
      userId: user.id,
    })
    await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/user/activate/${activationLink}`)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens(userDto.id, userDto.email)
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } })
    let isPassEquals = false
    if (user) {
      isPassEquals = await bcrypt.compare(password, user.password)
    }
    if (!user || !isPassEquals) {
      throw ApiError.BadRequest('Your email or password was entered incorrectly.')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens(userDto.id, userDto.email)
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async activate(link: string) {
    const user = await User.findOne({ where: { activationLink: link } })
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link')
    }
    user.isActivated = true
    await user.save()
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userTokenData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userTokenData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await User.findByPk(userTokenData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens(userDto.id, userDto.email)
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  //add
  async getUsers() {
    const users = await User.findAll()
    return users
  }
}

export default new UserService()
