'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('⛔ 發生錯誤：', error)
  }, [error])

  return (
    <div className='p-8 text-center'>
      <h2 className='text-2xl font-semibold mb-4 text-red-600'>出了點問題</h2>
      <p className='mb-2'>無法載入頁面內容。</p>
      <p className='text-sm text-gray-500 mb-6'>
        {error.message || '未知錯誤'} (digest: {error.digest || 'N/A'})
      </p>
      <button
        onClick={() => reset()}
        className='px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition'
      >
        重新整理頁面
      </button>
    </div>
  )
}
