import React, { useState } from 'react'

import { uploadTheme } from '../../utils'
import { strings } from '../theme/strings.js'
import { theme } from '../theme/themes.js'
import { MainButton } from './Buttons'

export const rectangle = {
  margin: theme.uploadRectangleMargin,
  padding: theme.uploadRectanglePadding,
  marginTop: theme.uploadRectangleMarginTop,
  display: theme.uploadRectangleDisplay as 'table-cell'
}

export const formStyle = {
  height: theme.uploadFormStyleHeight,
  width: theme.uploadFormStyleWidth,
  background: theme.uploadFormStyleBackground,
  color: theme.uploadFormStyleColor,
  tableLayout: theme.uploadFormStyleTextAlign as 'auto'
}
const firstRow = {
  display: theme.firstRowDisplay,
  width: theme.firstRowWidth,
  height: theme.firstRowHeight,
  verticalAlign: theme.firstRowVerticalAlign,
  textAlign: theme.firstRowTextAlign as 'center'
}

const fileSelection = {
  display: theme.fileSelectionDisplay as 'table-cell'
}

const secondRow = {
  width: theme.secondRowWidth,
  height: theme.secondRowHeight,
  verticalAlign: theme.secondRowVerticalAlign,
  textAlign: theme.secondRowTextAlign as 'center',
  display: theme.secondRowDisplay as 'table'
}

const uploadSuccessfulMessage = {
  color: theme.uploadSuccessfulMessageColor,
  textAlign: theme.uploadSuccessfulMessageTextAlign as 'center'
}

export function UploadTheme(): JSX.Element {
  const [uploaded, setUploaded] = useState(false)
  return (
    <>
      <div style={rectangle}>
        <h1>Upload Theme</h1>
        <div style={formStyle}>
          <tr style={firstRow}>
            <td style={fileSelection}>
              <input
                type={strings.uploadInputType}
                name={strings.uploadInputName}
                id={strings.uploadInputID}
              />
              <MainButton
                label={strings.uploadMainButtonLabel}
                onClick={() => {
                  const status = uploadTheme()
                  setUploaded(status)
                }}
              />
            </td>
          </tr>
          <tr style={secondRow}>
            <td>
              {uploaded && (
                <span style={uploadSuccessfulMessage}>
                  Successfully uploaded theme
                </span>
              )}
            </td>
          </tr>
        </div>
      </div>
    </>
  )
}
