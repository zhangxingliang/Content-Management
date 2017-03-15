const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [notifyPlugin]
})
const rdUI = window['radon-ui']
Vue.use(rdUI.RadonInstall, {
  Modal: true,
  Notification: true,
  LoadingBar: true
})
