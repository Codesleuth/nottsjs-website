/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

// import Header from './header'
import LeftContent from './left-content'
import Declaration from './declaration'
import HelpOut from './help-out'
import Footer from './footer'
import Scripts from './scripts'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3 center-align">
            <LeftContent />
          </div>

          <div className="col s12 m8 l9 left-align">
            {children}
          </div>
        </div>
      </div>

      <Declaration />
      <HelpOut />
      <Footer />
      <Scripts />
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
