// import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import useAuth from '../../sections/auth/login/useAuth';
import Biogasapi from '../apis/Biogasapi';


const ManagerAdd = () => {
    const navigate = useNavigate();
    const {uid} = useAuth();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")


    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    }

    const handleAddDeviceSubmit = async () => {
                
        try {
            const response = await Biogasapi.post("/add_manager_user", {
                name,
                password,
                address,
                mobile,
                email,
                adminId : uid,
                role : "manager"
            });
    
            if (response.status !== 200) {
                alert("There was a problem");
            } else {
                alert("Succesfully Added")
                navigate('/dashboard/app'); 
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    

    return (
        
        <div className="add-device-container">
            <Stack spacing={3}>
                <TextField name="name" label="User Name" value={name} onChange={handleNameChange} required/>
                <TextField name="email" label="Email" value={email} onChange={handleEmailChange} required/>
                <TextField name="password" label="Password" value={password} onChange={handlePasswordChange} required/>
                <TextField name="address" label="Address" value={address} onChange={handleAddressChange} required/>
                <TextField name="mobile" label="Mobile" value={mobile} onChange={handleMobileChange} required/>
            </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleAddDeviceSubmit} style={{ marginTop: '16px' }}>
        ADD MANAGER
      </LoadingButton>
        </div>
    )
}

export default ManagerAdd;