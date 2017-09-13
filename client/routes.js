// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
      callback(require)
  }
}

const routes = {
  childRoutes: [{
      path: '/',
      // component: require('./common/containers/Root'),
      indexRoute: {
          getComponent(nextState, callback) {
              require.ensure([], require => {
                  callback(null, require('./containers/Home'))
              }, 'home')
          }
      },
      childRoutes: [{
          path: 'test',
          getComponent(nextState, callback) {
              require.ensure([], require => {
                  callback(null, require('./containers/Home'))
              }, 'test')
          }
      }]
  }]
}

export default routes
