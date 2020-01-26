import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="postList">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              { ( title !== "" && title !== "NOTITLE" ) ? (<h2 className="has-text-weight-bold is-size-2">{title}</h2>) : null }
              {posts.map(({ node: post }) => (
                <article
                  className={post.featured_media ? "post has-media" : "post no-media" }
                  key={post.id}
                >
                  <header>
                    <Link className="has-text-primary" to={post.slug}>
                      <h1 className="title is-large">{post.title}</h1>
                    </Link>
                    <p>
                        <small>
                          <span className="post-date">{post.date}</span>{' '}
                          <Link to={`/author/${post.author.slug}`}>
                            {post.author.name}
                          </Link>
                        </small>
                    </p>
                  </header>
                  <div className="columns is-vcentered">
                    {post.featured_media ? (
                      <div className="column is-4">
                         <Link className="has-text-primary" to={post.slug}>
                          <Img fluid={post.featured_media.localFile.childImageSharp.fluid} key={post.featured_media.localFile.childImageSharp.fluid.src}  />
                        </Link>
                      </div>
                    ) : null}
                    <div className="column">
                      <div>
                        <div
                          className="content is-medium"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                          }}
                        />
                        <Link className="button is-primary" to={post.slug}>
                          Keep Reading →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
    featured_media {
      localFile {
        url
        childImageSharp {
           fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`
