import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { environment } from './services'
const { ENV } = environment

import Template from './views/Template/Template'
/*
CODE SPLITTING:
This weird hackery is the most clean way to split components into different JS
files that are loaded async. Router does not officially support this.
Please note, migration to v4 is a BREAKING change.
https://github.com/reactGo/reactGo/pull/841/files
*/
const SplitFrontPage = (l, c) => require.ensure([], () => c(null, require('./views/FrontPage').default))
const SplitDashboard = (l, c) => require.ensure([], () => c(null, require('./views/Dashboard').default))
const SplitModel = (l, c) => require.ensure([], () => c(null, require('./views/Model').default))
const SplitNotFound = (l, c) => require.ensure([], () => c(null, require('./views/NotFound').default))

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const loginRoute = ENV === 'production' ? '/auth/google' : '/auth/google'
  const requireAuth = (nextState, replace, callback) => {
    const { user } = store.getState()
    const authenticated = user.authenticated || false
    if (typeof window === 'object' && !authenticated) {
      try {
        window.location = loginRoute
      } catch (err) {
        console.error(err)
      }
      replace({ state: { nextPathname: nextState.location.pathname } })
    }
    callback()
  }
  /*
  BUG: UWShib is redirecting many users to /login/undefined after successful auth.
  This is a client (thus server because SSR) sided redirect to address the issue as I find the root cause.
  */
  const LoginCallbackRoute = () => <div>Redirecting...</div>
  const loginCallbackPatch = (nextState, replace, callback) => {
    if (typeof window === 'object') {
      try {
        window.location = '/'
      } catch (err) {
        console.error(err)
      }
      replace({ state: { nextPathname: nextState.location.pathname } })
    }
    callback()
  }

  return (
    <Route path='/' component={Template} >
      <IndexRoute getComponent={SplitFrontPage} />
      <Route path='/dashboard' getComponent={SplitDashboard} />
      <Route path='/model/:id' getComponent={SplitModel} />
      {/* <Route path='/edit/:id' onEnter={requireAuth} getComponent={SplitEdit} /> */}
      <Route path='*' getComponent={SplitNotFound} />
    </Route>
  )
}