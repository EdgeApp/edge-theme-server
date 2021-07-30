import React, { useState } from 'react'

import { downloadTheme } from '../../utils'
import { useFetchTheme } from '../hooks/useFetchTheme'
import { strings } from '../theme/strings.js'
import { theme } from '../theme/themes.js'
import { MainButton, SelectButton } from './Buttons'

export const rectangle = {
  margin: theme.downloadRectangleMargin,
  padding: theme.downloadRectanglePadding,
  marginTop: theme.downloadRectangleMarginTop,
  display: theme.downloadRectangleDisplay as 'table-cell'
}

export const formStyle = {
  height: theme.downloadFormStyleHeight,
  width: theme.downloadFormStyleWidth,
  background: theme.downloadFormStyleBackground,
  display: theme.downloadFormStyleDisplay,
  alignItems: theme.downloadFormStyleAlignItems,
  justifyContent: theme.downloadFormStyleJustifyContent,
  color: theme.downloadFormStyleColor
}

export function DownloadTheme(): JSX.Element {
  const [themeKey, setThemeKey] = useState('')
  const [themeKeys, setThemeKeys] = useState({})

  useFetchTheme(setThemeKeys).catch(e => console.log(e))

  return (
    <>
      <div style={rectangle}>
        <h1>Download Theme</h1>
        <div style={formStyle}>
          <SelectButton
            label={strings.downloadSelectButtonLabel}
            options={{ '': '--', ...themeKeys }}
            onChange={({ target: { value: theme } }) => {
              setThemeKey(theme)
            }}
          />
          <MainButton
            label={strings.downloadMainButtonLabel}
            onClick={() => {
              downloadTheme(themeKey)
            }}
          />
        </div>
      </div>
    </>
  )
}
