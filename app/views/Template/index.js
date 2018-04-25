import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import favicon from '../../images/favicon.ico'
const meta = [
  { charset: 'utf-8' },
  // Meta descriptions are commonly used on search engine result pages to
  // display preview snippets for a given page.
  { name: 'MERN SSR Boilerplate', content: 'A hot-reloading devkit' },
  // Setting IE=edge tells Internet Explorer to use the latest engine to
  //  render the page and execute Javascript
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  // Using the viewport tag allows you to control the width and scaling of
  // the browser's viewport:
  // - include width=device-width to match the screen's width in
  // device-independent pixels
  // - include initial-scale=1 to establish 1:1 relationship between css pixels
  // and device-independent pixels
  // - ensure your page is accessible by not disabling user scaling.
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  // Disable tap highlight on IE
  { name: 'msapplication-tap-highlight', content: 'no' },
  // Add to homescreen for Chrome on Android
  { name: 'mobile-web-app-capable', content: 'yes' },
  // Add to homescreen for Safari on IOS
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: 'T-Mobile Boilerplate' }
]
// Add to homescreen for Chrome on Android
const link = [{ rel: 'icon', href: favicon }]

import NavigationDrawer from 'react-md/lib/NavigationDrawers'

import Nav from './Nav'
import Login from './Login'

@connect(
  state => ({
    screen: state.screen
  })
)
class Template extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object,
    screen: PropTypes.object
  }
  render (
    { children, router, screen } = this.props
  ) {
    return (
      <div>
        <Helmet
          titleTemplate='%s - MERN Boilerplate'
          meta={meta} link={link}
        />
        <NavigationDrawer
          contentClassName='main-content'
          toolbarTitle='Application Boilerplate'
          drawerTitle='Navigation'
          navItems={Nav}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
          toolbarActions={[<Login />]}
        >
          <div className='main-container'>
            {children}
          </div>
        </NavigationDrawer>
      </div>
    )
  }
}

export default Template
