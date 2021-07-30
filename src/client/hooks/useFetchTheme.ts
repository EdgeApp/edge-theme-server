import React, { useEffect } from 'react'

import { listThemes } from '../../utils'

export async function useFetchTheme(
  setThemeKeys: React.Dispatch<React.SetStateAction<{}>>
): Promise<void> {
  const getThemes = async (): Promise<void> => {
    const listOfThemes = await listThemes()
    setThemeKeys(listOfThemes)
  }

  useEffect(() => {
    getThemes().catch(e => console.log(e))
  }, [])
}
