import { Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router'

function NotFoundPage() {
    const navigator = useNavigate();
    const handleClick = ()=>{
        navigator("/");
    }
  return (
    <div className='w-full bg-blue-gray-900'>
        <div className='items-center flex flex-col gap-5'>
            <h1>
                This Web Page Not avaiable
            </h1>
            <Button onClick={handleClick}>
                Back to Home
            </Button>
        </div>
    </div>
  )
}

export default NotFoundPage