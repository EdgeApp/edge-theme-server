import React, { useEffect } from 'react'

import { Sidebar } from './components/Sidebar'
import { theme } from './theme/themes.js'

export const body = {
  margin: theme.appBodyMargin,
  padding: theme.appBodyPadding,
  height: theme.appBodyHeight
}

export const fullRow = {
  width: theme.fullRowWidth,
  height: theme.fullRowHeight,
  display: theme.fullRowDisplay as 'table',
  tableLayout: theme.fullRowTableLayout as 'fixed'
}

export function MainScene(): JSX.Element {
  useEffect(() => {
    Object.assign(document.body.style, body)
  })
  return (
    <>
      <div style={fullRow}>
        <Sidebar />
      </div>
    </>
  )
}
