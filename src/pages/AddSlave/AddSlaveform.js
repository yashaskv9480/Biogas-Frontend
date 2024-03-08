// import React from "react";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import Biogasapi from '../apis/Biogasapi';

// components




const AddSlave = () => {
    const navigate = useNavigate();
    const {deviceId} = useParams();
    const [slaveId, setslaveId] = useState("")
    const [regadd, setregadd] = useState("")
    const [keys, setkeys] = useState("")
    const [minvalue, setminvalue] = useState()
    const [maxValue, setmaxValue] = useState()
    const [siUnits, setsiUnits] = useState()


    const handleslaveidChange = (event) => {
        setslaveId(event.target.value);
    }
    const handleregaddChange = (event) => {
        setregadd(event.target.value);
    }
    const handlekeysChange = (event) => {
        setkeys(event.target.value);
    }
    const handleminvalueChange = (event) => {
        setminvalue(event.target.value);
    }
    const handlemaxValueChange = (event) => {
        setmaxValue(event.target.value);
    }
    const handlesiunitsChange = (event) => {
        setsiUnits(event.target.value);
    }

    const handleAddSlaveSubmit = async() => {
        try {
            const response = await Biogasapi.post(`add-slave/${deviceId}`,{
                slave_id:slaveId,
                reg_add:regadd,
                keys,
                minvalue,
                maxvalue:maxValue,
                siunit:siUnits    
            })

            if(response.status !== 200){
                alert("There was a problem")
            }
            else{
                alert("Slave added Successfull")
                navigate('../devices')
            }      
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="add-device-container">
                <h1>Add Slave for device {deviceId}</h1>
            <Stack spacing={3}>
                <TextField name="slaveId" label="Slave Id" value={slaveId} onChange={handleslaveidChange} required/>
                <TextField name="regadd" label="Register Address" value={regadd} onChange={handleregaddChange} required/>
                <TextField name="keys" label="Keys" value={keys} onChange={handlekeysChange} required/>
                <TextField name="minvalue" label="Maximum Value" value={minvalue} onChange={handleminvalueChange} required/>
                <TextField name="maxvalue" label="Minimum Value" value={maxValue} onChange={handlemaxValueChange} required/>
                <TextField name="siunits" label="SI Unit" value={siUnits} onChange={handlesiunitsChange} required/>
            </Stack>


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleAddSlaveSubmit} style={{ marginTop: '16px' }}>
        ADD DEVICE
      </LoadingButton>
        </div>
    )
}

export default AddSlave;