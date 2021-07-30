import React, { useEffect } from 'react'

import { theme } from './theme/themes.js'

export const body = {
  margin: theme.appBodyMargin,
  padding: theme.appBodyPadding,
  height: theme.appBodyHeight
}

export function MainScene(): JSX.Element {
  useEffect(() => {
    Object.assign(document.body.style, body)
  })
  return (
    <>
      <h1>Theme Server</h1>
    </>
  )
}
