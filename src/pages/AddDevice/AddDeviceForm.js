// import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import Biogasapi from '../apis/Biogasapi';

// components




const AddDevice = () => {
    const navigate = useNavigate();

    const [macID, setMacID] = useState("")
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [description, setDescription] = useState("")

    const handleMacChange = (event) => {
        setMacID(event.target.value);
    }
    const handleLogitudeChange = (event) => {
        setLongitude(event.target.value);
    }
    const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleAddDeviceSubmit = async() => {
        const uid = Cookies.get('uid')
        try {
            const response = await Biogasapi.post("/adddevice",{
                device_id:macID,
                longitude,
                latitude,
                description
            })

            if(response.status !== 200){
                alert("There was a problem")
            }
            else{
                navigate('/dashboard/app')
            }      
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="add-device-container">
            <Stack spacing={3}>
                <TextField name="email" label="Device MAC Id" value={macID} onChange={handleMacChange} required/>
                <TextField name="logitude" label="logitude" value={longitude} onChange={handleLogitudeChange} required/>
                <TextField name="latitude" label="latitude" value={latitude} onChange={handleLatitudeChange} required/>
                <TextField name="description" label="description" value={description} onChange={handleDescriptionChange} required/>
                

            </Stack>


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleAddDeviceSubmit} style={{ marginTop: '16px' }}>
        ADD DEVICE
      </LoadingButton>
        </div>
    )
}

export default AddDevice;