import createApp from './main.js'
import { setState } from './utils'

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
        setState({a, context, store})
        resolve(app);
      }).catch(reject)
    }, reject);
  });
};