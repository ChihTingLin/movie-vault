import WatchlistContainer from '@/components/WatchlistContainer'

export default function WatchlistPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-center mb-10'>待看清單</h1>
      <WatchlistContainer />
    </div>
  )
}
