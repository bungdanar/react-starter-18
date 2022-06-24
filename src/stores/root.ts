import { UiStore } from './ui'
import { UserStore } from './user'

export class RootStore {
  uiStore
  userStore

  constructor() {
    this.uiStore = new UiStore(this)
    this.userStore = new UserStore(this)
  }
}

export default new RootStore()
