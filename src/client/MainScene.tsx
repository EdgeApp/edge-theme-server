import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { APIKeyScreen } from './components/APIKeysComponent'
import { DownloadTheme } from './components/DownloadTheme'
import { Sidebar } from './components/Sidebar'
import { UploadTheme } from './components/UploadTheme'
import { strings } from './theme/strings.js'
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

export const row = {
  width: theme.rowWidth,
  height: theme.rowHeight,
  display: theme.rowDisplay as 'table',
  tableLayout: theme.rowTableLayout as 'fixed'
}
export const column = {
  height: theme.columnHeight,
  display: theme.columnDisplay
}

export function MainScene(): JSX.Element {
  const [apiKeyValid, setApiKeyValid] = useState(false)
  const [cookies, setCookie] = useCookies([
    strings.secretCookie,
    strings.accessCookie
  ])

  useEffect(() => {
    Object.assign(document.body.style, body)
  }, [])
  return (
    <>
      <div style={fullRow}>
        <Sidebar />
        <div style={column}>
          <div style={row}>
            <DownloadTheme />
            <UploadTheme />
          </div>
          <div style={row}>
            <APIKeyScreen
              apiKeyValid={apiKeyValid}
              setApiKeyValid={setApiKeyValid}
              cookies={cookies}
              setCookie={setCookie}
            />
          </div>
        </div>
      </div>
    </>
  )
}
