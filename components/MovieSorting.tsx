'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FilterIcon, Check } from 'lucide-react'
import clsx from 'clsx'
import { options } from '@/lib/constants/sorting'

export default function MovieSorting({
  selectedSorting,
  onSortingChange,
  sortingOptions = options,
}: {
  selectedSorting: { label: string; value: string }
  onSortingChange: (filter: { label: string; value: string }) => void
  sortingOptions?: { label: string; value: string }[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={clsx(
            'flex items-center gap-2 px-2 py-1 cursor-pointer w-50',
            'border border-gray-700 rounded-md'
          )}
        >
          <FilterIcon className='w-4 h-4' />
          {selectedSorting.label}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white w-50'>
        {sortingOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortingChange(option)}
          >
            <div
              className={clsx('w-4 h-4', {
                hidden: selectedSorting.value === option.value,
              })}
            />
            <Check
              className={clsx('w-4 h-4', {
                'text-primary': selectedSorting.value === option.value,
                hidden: selectedSorting.value !== option.value,
              })}
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
