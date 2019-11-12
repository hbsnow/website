import * as React from 'react'

const MediaQuery: React.FC<MediaQueryType> = (props, { children }) => (
  <React.Fragment>
    {window.matchMedia(props.query).matches && {children}}
  </React.Fragment>
)

export type MediaQueryType = {
  query: string
}

export default MediaQuery
