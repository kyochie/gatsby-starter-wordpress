import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <div className="container">
      <div className="column is-8 is-offset-2">
        <nav className="pagination is-large-desktop" role="navigation" aria-label="pagination">
          {previousPagePath ? (
              <Link to={previousPagePath} rel="prev" className="pagination-previous">
                Newer Posts
              </Link>
          ) : (<button className="button pagination-previous" title="Disabled button" disabled>Newer Posts</button>) }
          {nextPagePath ? (
              <Link to={nextPagePath} rel="next" className="pagination-next">
                Older Posts
              </Link>
          ) : (<button className="button pagination-next" title="Disabled button" disabled>Older Posts</button>) }
        </nav>
      </div>
    </div>
  )
}

export default Pagination
