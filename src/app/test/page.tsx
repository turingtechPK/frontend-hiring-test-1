import CallsData from '@/components/ui/CallsData'

import React, { Suspense } from 'react'

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: { [key: string]: string | string[] | undefined }
}
const page = (props: PageProps) => {
  const { page } = props.searchParams as { [key: string]: string }
  return (
    <div>
      <Suspense fallback='Loading' key={page}>
        <CallsData {...props} />
      </Suspense>
    </div>
  )
}

export default page
