import React from 'react'
import { useFormStatus } from 'react-dom'
const SaveNoteButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      type='submit'
      className='bg-[#4F46F8] text-white py-3 rounded-sm disabled:bg-gray-400'
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  )
}

export default SaveNoteButton
