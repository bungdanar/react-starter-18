import { makeObservable, observable } from 'mobx'
import { RootStore } from './root'

export class UiStore {
  rootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      themePrimaryColor: observable,
      themeAccentColor: observable,
      themeSidebarFontSize: observable,
    })
  }

  themePrimaryColor = '#16a085'
  themeAccentColor = '#21b9bb'
  themeSidebarFontSize = '13px'
}
