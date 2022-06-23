import { UiStore } from './ui'

export class RootStore {
  uiStore

  constructor() {
    this.uiStore = new UiStore(this)
  }
}

export default new RootStore()
