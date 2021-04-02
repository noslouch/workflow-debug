import styled from 'styled-components'
import { space, border, layout, flexbox, position, color } from 'styled-system'
import propTypes from '@styled-system/prop-types'

const Box = styled.div`
  ${space}
  ${border}
  ${layout}
  ${flexbox}
  ${position}
  ${color}
`

export default Box

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.layout,
  ...propTypes.flexbox,
  ...propTypes.position,
  ...propTypes.color,
}
