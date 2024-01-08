import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Biogasapi from '../apis/Biogasapi';


import Loader from "../../components/loading/Loading";



const ManagerListTable = () => {
    const [managers, setManagers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")  

    const navigate = useNavigate()

    const navigateHandle = () => {
        navigate('../add-manager', { role: "manager" }, { replace: true });
    }

    const managersWithUniqueId = managers.map((manager, index) => ({
        id: manager.uid,
        ...manager,
    }));

    const filteredManagers = managersWithUniqueId.filter((manager) =>
        manager.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deletemanager = async (uid) => {
        try {
          const deleteTodo = await Biogasapi.delete(`/deletemanager/${uid}`)
          console.log(deleteTodo);
          setManagers(managers.filter((manager) => manager.uid !== uid));
        } catch (err) {
          console.error(err.message);
        }
      };  

      const columns = [
        { field: 'name', headerName: 'Manager Name', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'mobile', headerName: 'Mobile', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => (
                <button className="btn btn-danger" onClick={() => {deletemanager(params.row.uid)}}>
                    Delete
                </button>
                
            ),
        },
    ];
    
    useEffect(() => {

        const fetchDevicesList = async () => {
            const uid = Cookies.get('uid')
            try {
                const response = await Biogasapi.get("/getmanagers");
                
                if(!response.error){
                    setManagers(response.data);
                    console.log(managers)
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
    return (
        <>
            <Helmet>
                <title> Sensor values </title>
            </Helmet>
            <Button
                style={{ marginBottom: '16px' }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={navigateHandle}
            >
                Add Manager
            </Button>
            {loading ? (
                <Loader />
            ) : managers.length > 0 ? (
                <>
                    <h1>Managers</h1>
                    {/* <TextField
                        label="Search by Description"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        style={{ margin: "16px 0" }}
                    /> */}
                    <center>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={filteredManagers}
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
                    </center>
                </>
            ) : (
                <h1>No Managers</h1>
            )}
        </>
    )
}

export default ManagerListTable