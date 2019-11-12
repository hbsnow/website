import * as React from 'react'

const Container: React.FC = ({ children }) => (
  <React.Fragment>
    <div className="container">{children}</div>
    <style jsx>{`
      .container {
        max-width: 45rem;
        margin: 0 auto;
        padding: 0 1em;
      }
    `}</style>
  </React.Fragment>
)

export default Container
