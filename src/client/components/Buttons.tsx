import React from 'react'

import { theme } from '../theme/themes.js'

const button = {
  outline: theme.buttonOutline,
  backgroundColor: theme.buttonBackgroundColor as 'transparent',
  fontSize: theme.buttonFontSize,
  cursor: theme.buttonCursor as 'pointer'
}

const mainButton = {
  ...button,
  overflow: theme.mainButtonOverflow as 'hidden',
  marginTop: theme.mainButtonMarginTop,
  marginLeft: theme.mainButtonMarginLeft,
  marginBottom: theme.mainButtonMarginBottom,
  color: theme.mainButtonColor,
  border: theme.mainButtonBorder
}

interface buttonProps {
  label: string
  onClick: () => void
}

export function MainButton(props: buttonProps): JSX.Element {
  return (
    <button style={mainButton} onClick={() => props.onClick()}>
      {props.label}
    </button>
  )
}

interface SelectButtonProps {
  label: string
  options: { [option: string]: string }
  onChange: Function
}

export const largeContainer = {
  marginLeft: theme.largeContainerMarginLeft,
  marginTop: theme.largeContainerMarginTop,
  display: theme.largeContainerDisplay,
  flexDirection: theme.largeContainerFlexDirection as 'column'
}

export const inputLabel = {
  fontSize: theme.inputLabelFontSize,
  color: theme.inputLabelColor
}

export const deviceTypeInput = {
  fontSize: theme.deviceTypeInputFontSize,
  backgroundColor: theme.deviceTypeInputBackgroundColor,
  border: theme.deviceTypeInputBorder,
  color: theme.deviceTypeInputColor,
  marginTop: theme.deviceTypeInputMarginTop,
  width: theme.deviceTypeInputWidth
}

export function SelectButton(props: SelectButtonProps): JSX.Element {
  const { options, label, onChange } = props
  return (
    <div style={largeContainer}>
      <div style={inputLabel}>{label}</div>
      <select style={deviceTypeInput} onChange={e => onChange(e)}>
        {Object.keys(options).map(option => (
          <option key={option} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  )
}
