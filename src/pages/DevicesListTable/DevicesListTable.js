import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loading/Loading";
import Biogasapi from "../apis/Biogasapi";

const DevicesListTable = () => {
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate()

    const navigateHandle = () => {
        navigate('../add-device', { replace: true });
    }

    const devicesWithUniqueId = devices.map((device, index) => ({
        id: device.device_id, // Use device_id as the unique identifier
        ...device,
    }));

    const filteredDevices = devicesWithUniqueId.filter((device) =>
        device.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowClick = (rowData) => {
        console.log("Clicked row: " , rowData.id);
        const encodeDeviceId = encodeURIComponent(rowData.id)
        console.log(encodeDeviceId);
        // navigate(`../../sensor-value/${encodeDeviceId}`)
        window.open(`../../sensor-value/${encodeDeviceId}`, "_blank")
    }

    const deletedevice = async (deviceId) => {
        try {
          const deletedevice = await Biogasapi.delete(`/deletedevice/${ deviceId}`)
          console.log(deletedevice);
          setDevices(devices.filter((device) => device.device_id!== deviceId));
        } catch (err) {
          console.error(err.message);
        }
      };  

      const navigateaddslave = async (deviceId) => {
        navigate(`/add-slave/${deviceId}`, { replace: true });
      };
      
      const columns = [
        { id: 1, field: 'device_id', headerName: 'Device ID', flex: 1 },
        { id: 2, field: 'logitude', headerName: 'Longitude', flex: 1 },
        { id: 3, field: 'latitude', headerName: 'Latitude', flex: 1 },
        { id: 4, field: 'description', headerName: 'Description', flex: 1 },
        // {
        //     field: 'delete',
        //     headerName: 'Delete',
        //     flex: 1,
        //     renderCell: (params) => (
        //         <button className="btn btn-danger" onClick={() => {deletedevice(params.row.device_id)}}>
        //             Delete
        //         </button>
                
        //     ),
        // },
        {
            field: 'add_slave',
            headerName: 'Add Slave',
            flex: 1,
            renderCell: (params) => (
                <button className="btn btn-primary" onClick={() => navigateaddslave(params.row.device_id)}>
                    Add Slave
                </button>
            ),
        },
        
        {
            field: 'view_slave',
            headerName: 'View Slave',
            flex: 1,
            renderCell: (params) => (
                <button className="btn btn-primary" onClick={() => {navigateaddslave(params.row.device_id)}} >
                    View Slave
                </button>
                
            ),
        },
        
    ];

    useEffect(() => {

        const fetchDevicesList = async () => {
            const uid = Cookies.get('uid')
            try {
                const response = await Biogasapi.get("/getdevices");
                
                if(!response.error){
                    setDevices(response.data);
                    console.log(devices)
                }
                console.log(response)
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDevicesList();
    }, [])

    console.log(devices)
    return (
        <>
            <Helmet>
                <title> Biogas | Devices </title>
            </Helmet>
            <Button
                style={{ marginBottom: '16px' }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={navigateHandle}
            >
                Add device
            </Button>
            {loading ? (
                <Loader />
            ) : devices.length > 0 ? (
                <>
                    <h1>Devices</h1>
                    {/* <TextField
                        label="Search by Description"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        style={{ margin: "16px 0" }}
                    /> */}
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid 
                            rows={filteredDevices} 
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
                            // onRowClick={(params) => {handleRowClick(params.row)}}
                            
                        />
                    </div>
                </>
            ) : (
                <h1>No devices</h1>
            )}
        </>
    )
}

export default DevicesListTable