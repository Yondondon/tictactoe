import React, { FC } from 'react'
import { RowItem } from '../RowItem/RowItem'

type RowProps = {
  rowId: number;
}

export const Row: FC<RowProps> = ({ rowId }) => {
  return (
    <div className='row'>
      <RowItem rowId={rowId} colId={1} />
      <RowItem rowId={rowId} colId={2} />
      <RowItem rowId={rowId} colId={3} />
    </div>
  )
}