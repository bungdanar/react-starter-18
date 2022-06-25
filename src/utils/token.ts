import { v4 as uuid } from 'uuid'

export class Token {
  static readonly LOGGED_IN_IDENTIFIER = 'logged_in'

  static getLoggedInIdentifier = () =>
    window.localStorage.getItem(this.LOGGED_IN_IDENTIFIER)

  static setLoggedInIdentifier = () => {
    window.localStorage.setItem(this.LOGGED_IN_IDENTIFIER, uuid())
  }

  static removeLoggedInIdentifier = () => {
    window.localStorage.removeItem(this.LOGGED_IN_IDENTIFIER)
  }
}
