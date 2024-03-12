import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loading/Loading";
import Biogasapi from "../apis/Biogasapi";
    


const SlaveListTable = () => {
    const [deviceRole, setdeviceRole] = useState([])
    const [loading, setLoading] = useState(true)
    const [user,setuser] = useState('')
    const [devices,setdevices] = useState('')
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');

    const navigate = useNavigate()

    const filteredslave = deviceRole.map((deviceRole, index) => ({
        id: `${deviceRole.uid}-${deviceRole.device_id}`, 
        ...deviceRole,
    }));

    console.log(filteredslave)
      const deleteslave = async (deviceId,slaveId,regadd) => {
        const confirmed = window.confirm("The values of the slave will be deleted !!! Not recommeded !!! Are you sure??");
        if (!confirmed) {
          return; 
        }
      
        try {
            const response = await Biogasapi.delete(`delete-slave/${deviceId}/${slaveId}/${regadd}`)

            if(response.status !== 200){
                alert("There was a problem")
            }
            else{
                alert("Slave deleted Successfully")
                navigate('../devices')
            }      
        } catch (err) {
            console.log(err.message);
        }
      };    

      
        const columns = [
        { id: 1, field: 'name', headerName: 'User Name', flex: 1 },
        { id: 2, field: 'description', headerName: 'Device id', flex: 1 }
    ];

    useEffect(() => {

        const fetchslaveList = async () => {
            try {
                const response = await Biogasapi.get(`/device-management`); 
                const response1 = await Biogasapi.get(`/users`)
                const response2 = await Biogasapi.get('/devices')
                if(!response.error){
                    setdeviceRole(response.data);
                    setuser(response1.data)
                    setdevices(response2.data)
                }
                console.log(devices)

            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchslaveList();
    }, [])

    const handleAddrole = async () => {

        console.log(selectedDevice,selectedUser)
            try {
                const response = await Biogasapi.post( `/device-management`,
                {  uid: selectedUser,
                device_id: selectedDevice}
                )
                if(response.status === 201){
                    alert ("Added succesfully")
                    window.location.reload(); 
                }
                else{
                    alert("Failed to add role")
                }
            }
            catch (err){
                console.log(err.message)
            }
    }

    return (
        <>
            <Helmet>
                <title> Biogas | View Slaves </title>
            </Helmet>
            <div>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Username</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        autoWidth
                        label="Username"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {user.map(user => (
                            <MenuItem key={user.uid} value={user.uid}>{user.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Device</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={selectedDevice}
                        onChange={(e) => setSelectedDevice(e.target.value)}
                        autoWidth
                        label="Device"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {devices.map(device => (
                            <MenuItem key={device.device_id} value={device.device_id}>{device.description}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <button style={{ marginLeft: '20px', marginTop: '20px' }} className="btn btn-danger" onClick={handleAddrole}>
                    Add Role
                </button>
                    </div>
            {loading ? (
                <Loader />
            ) : deviceRole.length > 0 ? (
                <>
                    <h1>Allowed access</h1>
                    <div style={{ height: 'auto', width: '40%',marginLeft:'20%' }}>
                        <DataGrid 
                            rows={filteredslave} 
                            columns={columns} 
                            pageSize={10} 
                            sx={{
                                boxShadow: 2,
                                border: 2,
                                borderColor: 'primary.light',
                                '& .MuiDataGrid-cell:hover': {
                                  color: 'primary.main',
                                },
                              }}
                        />
                    </div>
                    <h1>Add access</h1>     
 
                </>
                
            ) : (
                <h1>No  added Roles</h1>
            )}
        </>
    )
}

export default SlaveListTable;