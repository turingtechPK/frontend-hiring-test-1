'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Pagination } from './Pagination'
import { Call } from './CallsData'
import { useFormState } from 'react-dom'
import { addNotes } from '@/lib/actions'
import SaveNoteButton from './SaveNoteButton'

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

const CallDataTable = ({
  data,
  pageNumber,
}: {
  data: {
    data: [Call]
    hasNextPage: boolean
    totalPages: number
  }
  pageNumber: number
}) => {
  const [state, dispatch] = useFormState(addNotes, null)
  const [filterStatus, setFilterStatus] = useState('')
  const [open, setopen] = useState(false)
  const [dialogStates, setDialogStates] = useState({})
  const filteredData = data.data.filter((call) => {
    if (filterStatus === 'Archived') {
      return call.is_archived
    } else if (filterStatus === 'Unarchived') {
      return !call.is_archived
    }
    return true // If All is selected, no filtering
  })

  //   if (state?.message === 'Note Added') {
  //     state.message = ''
  //     setopen(false)
  //   }
  console.log(filteredData[0])
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
        <Select
          onValueChange={(e) => setFilterStatus(e)}
          defaultValue={filterStatus}
          //   onChange={(e) => setFilterStatus(e.target.value)}
        >
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
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {filteredData.map((call) => (
                    <tr key={call.id}>
                      <Dialog
                        //@ts-ignore
                        open={dialogStates[call.id] || false}
                        onOpenChange={(value) =>
                          setDialogStates({ ...dialogStates, [call.id]: value })
                        }
                      >
                        <DialogTrigger key={call.id} asChild>
                          <td
                            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm capitalize font-medium  sm:pl-6 ${
                              call.call_type === 'missed'
                                ? 'text-[#C91D3E]'
                                : call.call_type === 'answered'
                                ? 'text-[#1DC9B7]'
                                : 'text-[#325AE7]'
                            }`}
                          >
                            {call.call_type}
                          </td>
                        </DialogTrigger>
                        <DialogContent key={call.id} className='max-w-[540px]'>
                          <DialogHeader key={call.id} className=' border-b'>
                            <DialogTitle key={call.id} className='text-lg'>
                              Add Notes
                            </DialogTitle>
                            <DialogDescription
                              key={call.id}
                              className='text-[#4F46F8]'
                            >
                              Call ID {call.id}
                            </DialogDescription>
                          </DialogHeader>

                          <div className='w-full'>
                            <div className='flex gap-x-4 '>
                              <div className=' flex flex-col gap-y-3'>
                                <span>Call Type</span>
                                <span>Duration</span>
                                <span>FROM</span>
                                <span>TO</span>
                                <span>VIA</span>
                              </div>
                              <div className=' flex flex-col gap-y-3'>
                                <div>
                                  <span className='text-[#325AE7] capitalize'>
                                    {call.call_type}
                                  </span>
                                </div>
                                <div>
                                  <span>{formatDuration(call.duration)}</span>
                                </div>
                                <div>
                                  <span>{call.from}</span>
                                </div>
                                <div>
                                  <span>{call.to}</span>
                                </div>
                                <div>
                                  <span>{call.via}</span>
                                </div>
                              </div>
                            </div>

                            <div className='flex flex-col gap-y-1 pt-5'>
                              <span>Notes</span>

                              <ul>
                                {call.notes.length < 1
                                  ? 'No Notes Avaliable'
                                  : call.notes.map((note, index) => (
                                      <li key={index}>{note.content}</li>
                                    ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                      <td className='relative whitespace-nowrap  pr-4  px-3 text-sm font-medium sm:pr-6'>
                        <Dialog
                          //@ts-ignore
                          open={dialogStates[`note_${call.id}`] || false}
                          onOpenChange={(value) =>
                            setDialogStates({
                              ...dialogStates,
                              [`note_${call.id}`]: value,
                            })
                          }
                        >
                          <DialogTrigger asChild>
                            <button className='text-white bg-[#4F46F8] py-1 px-2 rounded-sm '>
                              Add Note
                            </button>
                          </DialogTrigger>
                          <DialogContent className='max-w-[540px]'>
                            <DialogHeader className=' border-b'>
                              <DialogTitle className='text-lg'>
                                Add Notes
                              </DialogTitle>
                              <DialogDescription className='text-[#4F46F8]'>
                                Call ID {call.id}
                              </DialogDescription>
                            </DialogHeader>
                            <form
                              action={dispatch}
                              className='bg-white flex flex-col w-full justify-center max-w-xl mx-auto  gap-y-5 '
                            >
                              <div className='w-full'>
                                <div className='flex gap-x-4 '>
                                  <div className=' flex flex-col gap-y-3'>
                                    <span>Call Type</span>
                                    <span>Duration</span>
                                    <span>FROM</span>
                                    <span>TO</span>
                                    <span>VIA</span>
                                  </div>
                                  <div className=' flex flex-col gap-y-3'>
                                    <div>
                                      <input
                                        id='activityId'
                                        name='activityId'
                                        className=' sr-only'
                                        defaultValue={call.id}
                                      />
                                      <span className='text-[#325AE7] capitalize'>
                                        {call.call_type}
                                      </span>
                                    </div>
                                    <div>
                                      {/* <input
                                        id='call_duration'
                                        name='call_duration'
                                        className=' sr-only'
                                        value={formatDuration(call.duration)}
                                      /> */}
                                      <span>
                                        {formatDuration(call.duration)}
                                      </span>
                                    </div>{' '}
                                    <div>
                                      {/* <input
                                        id='callFrom'
                                        name='callFrom'
                                        className=' sr-only'
                                        value={call.from}
                                      /> */}
                                      <span>{call.from}</span>
                                    </div>{' '}
                                    <div>
                                      {/* <input
                                        id='callTo'
                                        name='callTo'
                                        className=' sr-only'
                                        value={call.to}
                                      /> */}
                                      <span>{call.to}</span>
                                    </div>{' '}
                                    <div>
                                      {/* <input
                                        id='callVia'
                                        name='callVia'
                                        className=' sr-only'
                                        value={call?.via?.toString()}
                                      /> */}

                                      <span>{call.via}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className='flex flex-col gap-y-1 pt-5'>
                                  <span>Notes</span>
                                  <textarea
                                    required
                                    id='note'
                                    name='note'
                                    rows={5}
                                    placeholder='Add Notes'
                                    className=' border-2 focus-within:outline-none focus:ring-0 ring-0 pl-4 pt-4 '
                                  />
                                </div>
                              </div>
                              <SaveNoteButton />
                            </form>
                          </DialogContent>
                        </Dialog>
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
        page={pageNumber}
        hasNextPage={data.hasNextPage}
        totalPages={data.totalPages}
      />
    </div>
  )
}

export default CallDataTable
