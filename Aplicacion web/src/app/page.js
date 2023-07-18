"use client"
import ThreeDots from '@/components/common/ThreeDots'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  router.push('/auth/login')
  return (
    <main className="flex min-h-screen dark:bg-black flex-col items-center justify-between p-24">
      <ThreeDots/>
    </main>
  )
}
