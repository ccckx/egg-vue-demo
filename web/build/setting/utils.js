const setState = ({a, context, store}) => {
  let state = {}
  a.map(item => {
    state = Object.assign(state, item)
  })
  store.commit('initSsrState', state)
  context && (context.state = store.state)
}

module.exports = {
  setState
}