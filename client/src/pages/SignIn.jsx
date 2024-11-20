import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInFailure, signInStart, signInSuccess} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
const SignIn = () => {
    const [formData, setFormData] = useState({})
    const {loading,error}=useSelector((state) => state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart)
        try {
            const res = await fetch('/api/auth/sign-in', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data=await res.json()
            if (data.success===false){
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
                navigate('/')

        } catch (e) {
        dispatch(signInFailure(e.message))
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email'
                       onChange={handleChange}/>
                <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password'
                       onChange={handleChange}/>
                <button disabled={loading} className='bg-slate-700 text-white p-3
                    rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ?"loading ...":'Sign in'}
                </button>
                <OAuth/>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>don't have an account?</p>
                <Link to='/sign-up'><span className='text-blue-700'>Sign Up</span></Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
};

export default SignIn;
