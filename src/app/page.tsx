import CallsData from '@/components/ui/CallsData'
import { LucideLoader2 } from 'lucide-react'

import React, { Suspense } from 'react'

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: { [key: string]: string | string[] | undefined }
}
const page = (props: PageProps) => {
  const { page } = props.searchParams as { [key: string]: string }
  return (
    <div>
      <Suspense
        fallback={
          <h1 className='h-screen grid place-items-center '>
            <LucideLoader2 className=' h-20 w-20 animate-spin' />
          </h1>
        }
        key={page}
      >
        <CallsData {...props} />
      </Suspense>
    </div>
  )
}

export default page
