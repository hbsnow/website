import * as React from 'react'

const Spacing: React.FC<SpacingType> = (props, { children }) => (
  <React.Fragment>
    <div className="spacing">{children}</div>
    <style jsx>{`
      .spacing {
        margin: ${props.top} ${props.right} ${props.bottom} ${props.left};
      }
    `}</style>
  </React.Fragment>
)

export type SpacingType = {
  top: string
  right: string
  bottom: string
  left: string
}

Spacing.defaultProps = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
}

export default Spacing
