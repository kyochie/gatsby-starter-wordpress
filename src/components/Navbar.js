import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo-kyleyochum.svg'
const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <nav className="navbar is-transparent is-large topNav">
            <div className="container">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <figure className="image">
                    <img src={logo} alt="Kaldi" style={{ width: '150px' }} />
                  </figure>
                </Link>
                 {/* Hamburger menu */}
                <div
                  className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                  data-target="navMenu"
                  onClick={() => this.toggleHamburger()}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
                <div
                id="navMenu"
                className={`navbar-menu ${this.state.navBarActiveClass}`}
              >
                <div className="navbar-start hast-te">
                  <Link
                    className="navbar-item"
                    to={`/`}
                    key={`/`}
                  >
                    Home
                  </Link>
                  {data.allWordpressPage.edges.map(edge => (
                    <Link
                      className="navbar-item"
                      to={edge.node.slug}
                      key={edge.node.slug}
                    >
                      {edge.node.title}
                    </Link>
                  ))}
                </div>
                <div className="navbar-end has-text-centered">
                  <a
                    className="navbar-item"
                    href="https://github.com/GatsbyCentral/gatsby-starter-wordpress"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon">
                      <img src={github} alt="Github" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        )}
      />
    )
  }
}


export default Navbar
