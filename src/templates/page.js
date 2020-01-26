import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/Layout'

export const PageTemplate = ({ title, content, featured_img }) => {
  return (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
          !!featured_img.childImageSharp ? featured_img.childImageSharp.fluid.src : featured_img
          })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`,
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '150px',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
            '#000000 0.5rem 0px 0px, #000000 -0.5rem 0px 0px',
            backgroundColor: '#000000',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
        {title}
        </h1>
      </div>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                {!featured_img.childImageSharp ? (<h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>) : null}
                <div
                className="content is-medium"
                dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featured_url: PropTypes.string,
  resolutions: PropTypes.object,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data
  return (
    <Layout>
      <PageTemplate title={page.title} content={page.content} featured_img={page.featured_media.localFile} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page
 
export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          url
          childImageSharp {
             fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        media_details {
          height
          width
          image_meta {
            caption
            title
          }
        }
      }
    }
  }
`
