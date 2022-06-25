import { action, makeObservable, observable } from 'mobx'
import { userApi } from '../api/user'
import { CurrentUser, UserLoginPayload } from '../data-types/user'
import { Token } from '../utils/token'
import { RootStore } from './root'

export class UserStore {
  rootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      currentUser: observable,
      setCurrentUser: action,

      timeoutTimer: observable,
      setTimeoutTimer: action,
    })
  }

  currentUser: CurrentUser | null = null
  setCurrentUser = (user: CurrentUser | null): void => {
    this.currentUser = user
  }

  timeoutTimer: NodeJS.Timer | null = null
  setTimeoutTimer = (timer: NodeJS.Timer) => {
    this.timeoutTimer = timer
  }

  private assignUser = (user: CurrentUser) => {
    Token.setLoggedInIdentifier()
    this.setCurrentUser(user)
    this.launchAutoFrontendLogout(user.exp)
  }

  private frontendLogout = () => {
    Token.removeLoggedInIdentifier()
    this.setCurrentUser(null)

    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
    }
  }

  private launchAutoFrontendLogout = (expirationTime: number): void => {
    const now = Math.floor(Date.now() / 1000)
    const differ = expirationTime - now

    this.setTimeoutTimer(
      setTimeout(() => {
        alert('Session expired')
        this.frontendLogout()
      }, differ * 1000)
    )
  }

  login = async (payload: UserLoginPayload): Promise<void> => {
    try {
      const { data } = await userApi.login(payload)
      this.assignUser(data)
    } catch (error) {
      throw error
    }
  }

  logout = async (): Promise<void> => {
    try {
      await userApi.logout()
      this.frontendLogout()
    } catch (error) {
      throw error
    }
  }

  checkCurrentUser = async (): Promise<void> => {
    if (!Token.getLoggedInIdentifier()) {
      this.rootStore.uiStore.setAppLoaded(true)
      return
    }

    try {
      const { data: user } = await userApi.currentUser()

      this.setCurrentUser(user)
      this.launchAutoFrontendLogout(user.exp)
    } catch (error) {
      this.frontendLogout()
    } finally {
      this.rootStore.uiStore.setAppLoaded(true)
    }
  }

  handleMultiTabAuth = (storageEvent: StorageEvent) => {
    if (
      storageEvent.key === Token.LOGGED_IN_IDENTIFIER &&
      storageEvent.newValue !== storageEvent.oldValue
    ) {
      if (storageEvent.newValue === null && this.currentUser) {
        this.frontendLogout()
      } else {
        this.rootStore.uiStore.setAppLoaded(false)
        this.checkCurrentUser()
      }
    }
  }
}
