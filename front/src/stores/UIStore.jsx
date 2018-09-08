import { action, observable } from 'mobx'

class UIState {
    @observable language = 'en_US'
    @observable sidebarVisible = true 

    @action toggleSidebar = () => {this.sidebarVisible = !this.sidebarVisible}
}

export default new UIState()