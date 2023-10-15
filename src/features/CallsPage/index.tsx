'use client'
import {
  FiltersWrapper,
  Heading,
  HeadingWrapper,
  SelectWrapper,
  StyledSelect,
} from '@/styles/calls.styles'
import { CallsTable } from '../CallsTable'
import { useEffect, useState } from 'react'
import { getPusher } from '@/lib/pusher'

export const CallsPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string | null>(null)
  const handleChange = (value: string) => {
    setFilterValue(value)
  }
  const [pusher, setPusher] = useState<any>(null)

  useEffect(() => {
    const pusherInstance = getPusher()
    const channel = pusherInstance.subscribe('private-aircall')
    channel.bind('update-call', function (data: any, metadata: any) {
      console.log('data', data)
      console.log('metadata', metadata)
    })
    setPusher(pusherInstance)
  }, [])

  return (
    <div>
      <HeadingWrapper>
        <Heading>Turing Technologies Frontend Test</Heading>
      </HeadingWrapper>
      <FiltersWrapper>
        <div>Filter by: </div>
        <SelectWrapper>
          <StyledSelect
            defaultValue="Status"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'archived', label: 'Archived' },
              { value: 'unarchived', label: 'Unarchived' },
            ]}
          />
        </SelectWrapper>
      </FiltersWrapper>
      <div>
        <CallsTable filterValue={filterValue} />
      </div>
    </div>
  )
}
