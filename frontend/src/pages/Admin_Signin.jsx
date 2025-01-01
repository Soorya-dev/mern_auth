import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Admin_Signin = () => {
    return (
        <>
            <div>Signin</div>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email'
                    id='email' name='email' required
                    onChange={handleChange}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    className="bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    onChange={handleChange}
                />

            </form>

        </>
    )
}

export default Admin_Signin