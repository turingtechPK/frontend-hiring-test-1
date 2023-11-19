'use server'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type PaginationProps = {
  page?: string
  totalPages: number
  hasNextPage: boolean
}

export const Pagination = (props: PaginationProps) => {
  const { page = 1, totalPages, hasNextPage } = props

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages)

  const getPagesToShow = () => {
    let startPage = currentPage - 2
    let endPage = currentPage + 2

    if (currentPage <= 10) {
      startPage = 1
      endPage = 10
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4
      endPage = totalPages
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }

  const pages = getPagesToShow()

  return (
    <div className='flex items-center justify-center space-x-6 text-black py-10'>
      <Link
        className={cn(
          ' hover:bg-gray-50',
          currentPage === 1 ? 'pointer-events-none bg-gray-100' : ''
        )}
        href={`?page=${currentPage - 1}`}
      >
        <ChevronLeft className='text-[#A8AAAC]' />
      </Link>

      <nav
        aria-label='Pagination'
        className='relative z-0 flex gap-x-3 rounded-md'
      >
        {pages.map((p, i) => (
          <Link
            key={p}
            className={cn(
              'relative inline-flex items-center  text-sm font-medium px-3 py-1 rounded-sm hover:bg-gray-50',
              p === currentPage
                ? 'pointer-events-none bg-[#5f58eb] text-white'
                : '',
              i === 0 ? 'rounded-l-md' : '',
              i === pages.length - 1 ? 'rounded-r-md' : ''
            )}
            href={`?page=${p}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Link
        className={cn(
          ' hover:bg-gray-50',
          !hasNextPage ? 'pointer-events-none bg-gray-100' : ''
        )}
        href={`?page=${currentPage + 1}`}
      >
        <ChevronRight className='text-[#A8AAAC]' />
      </Link>
    </div>
  )
}
