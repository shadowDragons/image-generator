import Link from 'next/link'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'

const headerLinks = [
  // {
  //   name: 'repo',
  //   href: 'https://github.com/weijunext/nextjs-15-starter',
  //   icon: BsGithub,
  // },
  { name: 'twitter', href: 'https://x.com/Junexus_indie', icon: BsTwitterX },
  // {
  //   name: 'buyMeCoffee',
  //   href: 'https://www.buymeacoffee.com/weijunext',
  //   icon: SiBuymeacoffee,
  // },
]

const HeaderLinks = () => {
  return (
    <div className='flex flex-row items-center'>
      {headerLinks.map(link => (
        <Link
          key={link.name}
          href={link.href}
          target='_blank'
          rel='noopener norefferer nofollow'
          className='mx-3 flex max-w-[24px] flex-col items-center justify-center'
        >
          {link.icon && React.createElement(link.icon, { className: 'text-lg' })}
        </Link>
      ))}
    </div>
  )
}
export default HeaderLinks
