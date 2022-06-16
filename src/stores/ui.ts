import { action, computed, makeObservable, observable } from 'mobx'
import { RootStore } from './root'

type ScreenSize = 'mobile' | 'medium' | 'large'

export class UiStore {
  rootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      themePrimaryColor: observable,
      themeAccentColor: observable,
      themeSidebarFontSize: observable,

      currentSize: observable,
      setCurrentSize: action,

      sidebarOpen: observable,
      setSidebarOpen: action,

      openFloatingSidebar: computed,
    })
  }

  private readonly MAX_MOBILE_SIZE = 576
  private readonly MAX_MEDIUM_SIZE = 992

  themePrimaryColor = '#16a085'
  themeAccentColor = '#21b9bb'
  themeSidebarFontSize = '13px'

  currentSize: ScreenSize = 'large'
  setCurrentSize = (value: ScreenSize) => {
    this.currentSize = value
  }

  sidebarOpen: boolean = true
  setSidebarOpen = (value: boolean) => {
    this.sidebarOpen = value
  }

  get openFloatingSidebar(): boolean {
    return (
      this.sidebarOpen &&
      (this.currentSize === 'medium' || this.currentSize === 'mobile')
    )
  }

  handleToggleSidebar = () => {
    this.setSidebarOpen(!this.sidebarOpen)
  }

  handleCloseFloatingSidebar = () => {
    this.setSidebarOpen(false)
  }

  handleScreenResizeListener = () => {
    if (window.innerWidth <= this.MAX_MOBILE_SIZE) {
      if (this.currentSize !== 'mobile') {
        this.setCurrentSize('mobile')
        this.setSidebarOpen(false)
      }
    } else if (window.innerWidth <= this.MAX_MEDIUM_SIZE) {
      if (this.currentSize !== 'medium') {
        this.setCurrentSize('medium')
        this.setSidebarOpen(false)
      }
    } else {
      if (this.currentSize !== 'large') {
        this.setCurrentSize('large')
        this.setSidebarOpen(true)
      }
    }
  }
}
