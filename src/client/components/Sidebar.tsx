import React from 'react'

import { strings } from '../theme/strings.js'
import { Sidetab } from './Sidetab'

export function Sidebar(): JSX.Element {
  return (
    <>
      <Sidetab serverName={strings.sidetabServerName} />
    </>
  )
}
