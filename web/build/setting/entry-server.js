import createApp from './main.js'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      Promise.all(
        matchedComponents.map(async Component => {
          if (Component.asyncData) {
            let state = {}
            const data = await Component.asyncData({
              store,
              router: router.currentRoute
            })
            Object.keys(data).map(item => {
              state[item] = data[item]
            })
            return state
          }
        })
      ).then((a) => {
        let state = {}
        a.map(item => {
          state = Object.assign(state, item)
        })
        store.commit('initSsrState', state)
        context.state = store.state
        resolve(app);
      }).catch(reject)
    }, reject);
  });
};