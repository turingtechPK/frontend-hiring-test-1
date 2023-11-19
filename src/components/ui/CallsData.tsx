import React from 'react'
import { cookies } from 'next/headers'
import { PageProps } from '@/app/test/page'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pagination } from './Pagination'
import { revalidatePath } from 'next/cache'
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes} minutes ${remainingSeconds} seconds`
}
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', options)

  // Extracting parts of the formatted date and rearranging them
  const [month, day, year] = formattedDate.split('/')
  return `${day}-${month}-${year}`
}
type PaginatedCalls = {
  data: {
    paginatedCalls: {
      nodes: [Call]
      totalCount: number
      hasNextPage: boolean
    }
  }
}
type Call = {
  id: string
  direction: string
  from: string
  to: string
  duration: number
  via: String
  is_archived: Boolean
  call_type: string
  created_at: string
  notes: [Note]
}
type Note = {
  id: string
  content: string
}
const fetchCalls = async ({ offset = 0, limit = 10 }) => {
  ;('use server')
  const response = await fetch(
    'https://frontend-test-api.aircall.dev/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('access_token')?.value}`,
      },
      body: JSON.stringify({
        query: `
            query {
              paginatedCalls(offset: ${offset}, limit: ${limit}) {
                totalCount
                hasNextPage
                nodes {
                  id
                  direction
                  from
                  to
                  duration
                  via
                  is_archived
                  call_type
                  created_at
                  notes {
                    id
                    content
                  }
                }
              }
            }
          `,
      }),
    }
  )

  const result: PaginatedCalls = await response.json()
  //   console.log(result)
  revalidatePath('/test')
  return {
    data: result.data.paginatedCalls.nodes,
    hasNextPage: result.data.paginatedCalls.hasNextPage,
    totalPages: Math.ceil(result.data.paginatedCalls.totalCount / limit),
  }
}
const CallsData = async (props: PageProps) => {
  const { page } = props.searchParams as { [key: string]: string }
  const pageNumber = Number(page ? page : 1)
  const skip = (pageNumber - 1) * 10
  const data = await fetchCalls({ offset: skip, limit: 10 })

  console.log(data)
  return (
    <div className='px-4 sm:px-6  lg:px-11 pt-7'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className=' text-[28px] font-medium leading-6 text-[#232323]'>
            Turing Technologies Frontend Test
          </h1>
        </div>
      </div>
      <div className='mt-4 flex gap-x-3 items-center'>
        <span className=' text-sm text-[#232323]'>Filter by:</span>
        <Select>
          <SelectTrigger className=' w-fit border-0 focus-visible:outline-none focus:ring-offset-0 focus:ring-0'>
            <SelectValue placeholder='Status' className=' ' />
          </SelectTrigger>
          <SelectContent className=' w-[201px] py-2 '>
            <SelectGroup>
              <SelectItem
                className='focus:bg-[#4E45F6]/[22%] focus:text-[#4F46F8]'
                value='All'
              >
                All
              </SelectItem>
              <SelectItem
                className='focus:bg-[#4E45F6]/[22%] focus:text-[#4F46F8] text-left'
                value='Archived'
              >
                Archived
              </SelectItem>
              <SelectItem
                className='focus:bg-[#4E45F6]/[22%] focus:text-[#4F46F8]'
                value='Unarchived'
              >
                Unarchived
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-xs font-medium text[#232323] sm:pl-6'
                    >
                      CALL TYPE
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      DIRECTION
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      DURATION
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      FROM
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      TO
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      VIA
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      CREATED AT
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      STATUS
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-xs font-medium text[#232323]'
                    >
                      ACTIONS
                    </th>
                    {/* <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                    >
                      <span className='sr-only'>Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {data.data.map((call) => (
                    <tr key={call.id}>
                      <td
                        className={`whitespace-nowrap py-4 pl-4 pr-3 text-xs capitalize font-medium  sm:pl-6 ${
                          call.call_type === 'missed'
                            ? 'text-[#C91D3E]'
                            : call.call_type === 'answered'
                            ? 'text-[#1DC9B7]'
                            : 'text-[#325AE7]'
                        }`}
                      >
                        {call.call_type}
                      </td>
                      <td className='whitespace-nowrap capitalize px-3 py-4 text-sm text-[#325AE7]'>
                        {call.direction}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-[#232323]'>
                        <div className='flex flex-col gap-y-1'>
                          <span>{formatDuration(call.duration)}</span>
                          <span className='text-[#325AE7]'>{`(${call.duration} seconds)`}</span>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-[#232323]'>
                        {call.from}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-[#232323]'>
                        {call.to}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-[#232323]'>
                        {call.via}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-[#232323]'>
                        {formatDate(call.created_at)}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-xs  `}>
                        <span
                          className={`${
                            call.is_archived
                              ? 'text-[#1DC9B7] bg-[#1DC9B7]/10 py-1 px-2 rounded-sm'
                              : 'text-[#727272] bg-[#727272]/10 py-1 px-2 rounded-sm'
                          }`}
                        >
                          {call.is_archived ? 'Archived' : 'Unarchived'}
                        </span>
                      </td>
                      <td className='relative whitespace-nowrap  pr-4  text-sm font-medium sm:pr-6'>
                        <button className='text-white bg-[#4F46F8] py-1 px-2 rounded-sm'>
                          Add Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        {...props.searchParams}
        hasNextPage={data.hasNextPage}
        totalPages={data.totalPages}
      />
    </div>
  )
}

export default CallsData
