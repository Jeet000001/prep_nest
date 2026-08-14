import ContactForm from '@/Components/contact/ContactForm'
import React from 'react'

const Page = () => {
  return (
    <div  className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36 lg:pb-20">
        <ContactForm />
    </div>
  )
}

export default Page