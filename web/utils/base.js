export const initData = (vm) => {
  let state = vm.$store.state[vm.ssrStoreKey]
  if (state) {
    Object.keys(state).map(item => {
      vm[item] = state[item]
    })
  }
}