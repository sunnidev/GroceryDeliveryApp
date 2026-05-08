import React from 'react'
import connectDb from '../lib/db'
import User from '../models/user.model'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import EditRoleMobile from '../components/EditRoleMobile'

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
    <div>
      Hello How are yo
    </div>
  )
}

export default home
