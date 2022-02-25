export default class ApiError extends Error {
  status: number
  errors: Array<any>
  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized')
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }

  static Internal(message: string) {
    return new ApiError(500, message)
  }

  static Forbidden(message: string) {
    return new ApiError(403, message)
  }
}
