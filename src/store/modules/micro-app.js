const state = {
  apps: []
}

const mutations = {
  SETTING_APPS: (state, apps) => {
    state.apps = apps
  }
}

const actions = {
  changeApps({ commit }, data) {
    commit('SETTING_APPS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

