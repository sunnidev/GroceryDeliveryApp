import React from 'react'
import connectDb from '../lib/db'
import User from '../models/user.model'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import EditRoleMobile from '../components/EditRoleMobile'
import Nav from '../components/Nav'

const home = async () => {

  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)

  if(!user) {
    redirect('/login')
  }

  const inComplete = !user.mobile || !user.role ||(!user.mobile && user.role =='user')
  if(inComplete) {
    return <EditRoleMobile />
  }

  return (
    <>
      <Nav  user={user}/>
    </>
  )
}

export default home
