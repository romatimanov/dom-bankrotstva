'use client'

import React from 'react'
import ReactSelect, { Props as SelectProps } from 'react-select'

type OptionType = {
  value: string
  label: string
}

export type ClientSelectProps = SelectProps<OptionType, false>

export default function ClientSelect(props: ClientSelectProps) {
  return <ReactSelect {...props} />
}
