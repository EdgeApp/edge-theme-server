import React from 'react'

import logo from '../images/logo.png'
import { strings } from '../theme/strings.js'
import { theme } from '../theme/themes.js'

interface SidetabProps {
  serverName: string
}

const logoStyle = {
  marginTop: theme.logoStyleMarginTop,
  marginLeft: theme.logoStyleMarginLeft,
  marginBottom: theme.logoStyleMarginBottom,
  height: theme.logoStyleHeight,
  width: theme.logoStyleWidth
}

const titleText = {
  marginLeft: theme.titleTextMarginLeft,
  color: theme.titleTextColor,
  fontSize: theme.titleTextFontSize
}

const sidebar = {
  display: theme.sidetabSidebarDisplay as 'table-cell',
  background: theme.sidetabSidebarBackground,
  width: theme.sidetabSidebarWidth
}

export function Sidetab(props: SidetabProps): JSX.Element {
  return (
    <>
      <div style={sidebar}>
        <img style={logoStyle} src={logo} alt={strings.sidetabLogoAltText} />
        <div style={titleText}>Edge</div>
        <div style={titleText}>{props.serverName}</div>
      </div>
    </>
  )
}
