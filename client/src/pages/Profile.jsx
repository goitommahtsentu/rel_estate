import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const {currentUser} = useSelector(state => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center mt-5'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
                     src={currentUser.avatar} alt="profile"/>
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='name'/>
                <input type="email" placeholder='email' className='border p-3 rounded-lg ' id='email'/>
                <input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password'/>
                <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>delete account</span>

                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
};

export default Profile;
