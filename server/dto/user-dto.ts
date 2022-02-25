import { UserInstance } from '../models/models'

export default class UserDto {
  id: number
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  gender: string
  role: string
  isActivated: boolean
  constructor(model: UserInstance) {
    this.id = model.id
    this.email = model.email
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.dateOfBirth = model.dateOfBirth
    this.country = model.country
    this.gender = model.gender
    this.role = model.role
    this.isActivated = model.isActivated
  }
}
