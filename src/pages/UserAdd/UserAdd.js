// import React from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import Biogasapi from '../apis/Biogasapi';


const AddUser = (role) => {
    const navigate = useNavigate();
    console.log(role)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const formRef = React.useRef();


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
        const adminId = Cookies.get('uid');
        const type = Cookies.get('type');
        let role;   
        if (type === 'admin') {
            role = 'manager';
        } else if (type === 'manager') {
            role = 'user';
        } else {
            role = 'undefined';
        }   
        
        try {
            const response = await Biogasapi.post("/addmanager", {
                name,
                password,
                address,
                mobile,
                email,
                adminId,
                role
            });
    
            if (response.status !== 200) {
                alert("There was a problem");
            } else {
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
        ADD USER
      </LoadingButton>
        </div>
    )
}

export default AddUser;