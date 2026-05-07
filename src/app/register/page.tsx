'use client'
import RegisterForm from '@/src/components/RegisterForm'
import Wellcome from '@/src/components/Wellcome'
import React, { useState } from 'react'

const Register = () => {

    const [step, setStep] = useState(1)
    return (
        <div>
            {step == 1 ? <Wellcome nextStep={setStep}/> : <RegisterForm  prevStep={setStep}/>}
        </div>
    )
}

export default Register
