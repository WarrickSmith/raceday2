import Link from 'next/link'
import Image from 'next/image'

const AppLogo = () => {
  return (
    <Link href="/" className="flex-start">
      <div className={`flex flex-row items-end space-x-2`}>
        <Image
          src="/raceday2/logo.svg"
          width={32}
          height={32}
          alt={`Raceday 2 logo`}
          priority
        />
        <span className="text-xl">Raceday 2</span>
      </div>
    </Link>
  )
}

export default AppLogo
