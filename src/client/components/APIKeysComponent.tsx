import React, { useEffect, useState } from 'react'
import { CookieSetOptions } from 'universal-cookie'

import { checkAccessCredentials } from '../../utils'
import { strings } from '../theme/strings.js'
import { theme } from '../theme/themes.js'
import { MainButton } from './Buttons'

const listIndent = {
  margin: theme.apiListIndentMargin,
  paddingInlineStart: theme.apiListIndentPaddingInlineStart
}

const apiKeysMissingMessage = {
  color: theme.apiKeysMissingMessageColor
}

const apiKeysAccurateMessage = {
  color: theme.apiKeysAccurateMessageColor
}

const apiKeyMessage = {
  listStyleType: theme.apiKeyMessageListStyleType as 'none',
  textAlign: theme.apiKeyMessageTextAlign as 'center',
  fontSize: theme.apiKeyMessageListFontSize
}

const apiKeyUserDiv = {
  listStyleType: theme.apiKeyUserDivListStyleType as 'none',
  textAlign: theme.apiKeyUserDivTextAlign as 'center',
  marginTop: theme.apiKeyUserDivMarginTop,
  marginRight: theme.apiKeyUserDivMarginRight
}

const apiKeyInput = {
  fontSize: theme.apiKeyInputFontSize,
  width: theme.apiKeyInputWidth,
  borderWidth: theme.apiKeyInputBorderWidth,
  color: theme.apiKeyInputColor,
  outline: theme.apiKeyInputOutline as 'none'
}

export const rectangle = {
  margin: theme.apiRectangleMargin,
  padding: theme.apiRectanglePadding,
  display: theme.apiRectangleDisplay
}

export const formStyle = {
  height: theme.apiFormStyleHeight,
  width: theme.apiFormStyleWidth,
  background: theme.apiFormStyleBackground,
  display: theme.apiFormStyleDisplay,
  alignItems: theme.apiFormStyleAlignItems,
  justifyContent: theme.apiFormStyleJustifyContent,
  color: theme.apiFormStyleColor
}

interface apiKeyProps {
  cookies: {
    [name: string]: any
  }
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void
  apiKeyValid: boolean
  setApiKeyValid: React.Dispatch<React.SetStateAction<boolean>>
}

const validateCredentials = async (
  setApiKeyValid: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  const response = await checkAccessCredentials()
  setApiKeyValid(response.valid)
}

export function APIKeyScreen(props: apiKeyProps): JSX.Element {
  const [apiAccessKey, setApiAccessKey] = useState('')
  const [apiSecretKey, setApiSecretKey] = useState('')

  useEffect(() => {
    validateCredentials(props.setApiKeyValid).catch(e => console.log(e))
  }, [])

  return (
    <div style={rectangle}>
      <ul style={listIndent}>
        <li style={apiKeyMessage}>Enter Valid API Key.</li>
        <div style={formStyle}>
          <li style={apiKeyUserDiv}>
            <span>API Access Key</span>
            <input
              style={apiKeyInput}
              onChange={({ target: { value: accessKey } }) =>
                setApiAccessKey(accessKey)
              }
            />
          </li>
          <li style={apiKeyUserDiv}>
            <span>API Secret Key</span>
            <input
              style={apiKeyInput}
              onChange={({ target: { value: secretKey } }) =>
                setApiSecretKey(secretKey)
              }
            />
          </li>
          <li style={apiKeyUserDiv}>
            {!props.apiKeyValid && (
              <span style={apiKeysMissingMessage}>Enter valid API keys</span>
            )}
            {props.apiKeyValid && (
              <span style={apiKeysAccurateMessage}>API keys valid</span>
            )}
          </li>
          <li style={apiKeyUserDiv}>
            <MainButton
              label={strings.apiMainButtonLabel}
              onClick={() => {
                props.setCookie(strings.accessCookie, apiAccessKey)
                props.setCookie(strings.secretCookie, apiSecretKey)
              }}
            />
          </li>
        </div>
      </ul>
    </div>
  )
}
