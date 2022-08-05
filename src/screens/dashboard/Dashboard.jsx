import React, { useState } from 'react'
import { Strings } from '../../const'

export const Dashboard = ({ }) => {
    const [profile, setProfile] = useState({
        name: 'Sam Smith',
        enter_date: 'July 7, 2022',
        grade: 'Grade 6 Teacher',
        school: 'West Valley Middle School',
        daily_step_count: 1234,
        school_sponser: 'Mr. Smith’s Incredible 6ers'
    })
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mt-6 text-3xl font-extrabold text-center">
                    {Strings.dashboard.title}
                </h2>
            </div>
            <div className="mt-8 card sm:mx-auto sm:w-full sm:max-w-lg w-96 bg-base-200 shadow-xl text-left">
                <div className="card-body">
                    <div className='flex'>
                        <div className="text-lg font-light flex-1">{profile?.name}</div>
                        <div className="text-lg font-light flex-1">{profile?.enter_date}</div>
                    </div>
                    <div className='flex my-2'>
                        <div className="text-lg font-light flex-1">{profile?.grade}</div>
                        <div className="text-lg font-light flex-1">{profile?.school}</div>
                    </div>
                    <div className='flex'>
                        <div className="text-lg font-light flex-1">Daily Step Count: {profile?.daily_step_count}</div>
                        <div className="text-lg font-light flex-1">{profile?.school_sponser}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
