import { Nunito } from 'next/font/google';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar';
import RegisterModel from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import ClientOnly from './components/ClientOnly';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hotel Gasht',
  description: 'By Techwise',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly >
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModel />
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        </body>
    </html>
  )
}
