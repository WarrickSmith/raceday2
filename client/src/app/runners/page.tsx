import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Suspense } from 'react'

const Home = () => {
  return (
    <main className="w-full max-w-md mx-auto">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Runners</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">cards</div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        charts
      </div>
    </main>
  )
}

export default Home
