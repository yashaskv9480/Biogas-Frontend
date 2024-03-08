import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loading/Loading";
import useAuth from "../../sections/auth/login/useAuth";
import Biogasapi from "../apis/Biogasapi";

const SlaveListTable = () => {
    const {isAdmin} = useAuth();
    const {deviceId} = useParams();
    const [slave, setslave] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const filteredslave = slave.map((slave) => ({
        id: `${slave.slave_id}-${slave.reg_add}`,
        ...slave,
    }));
       

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
        { id: 1, field: 'slave_id', headerName: 'Slave ID', flex: 1 },
        { id: 2, field: 'reg_add', headerName: 'Register Address', flex: 1 },
        { id: 3, field: 'keys', headerName: 'Keys', flex: 1 },
        { id: 4, field: 'minvalue', headerName: 'Max Value', flex: 1 },
        { id: 4, field: 'maxvalue', headerName: 'Min Value', flex: 1 },
        { id: 4, field: 'siunit', headerName: 'SI Unit', flex: 1 },      
         isAdmin &&   
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => (
                <button className="btn btn-danger" onClick={() => {deleteslave(params.row.device_id,params.row.slave_id,params.row.reg_add)}}>
                    Delete
                </button>
                
            ),
        },
    ];

    useEffect(() => {

        const fetchslaveList = async () => {
            try {
                const response = await Biogasapi.get(`/view-slave/${deviceId}`);                
                if(!response.error){
                    setslave(response.data);
                    console.log(response)
                }
                console.log(response)
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchslaveList();
    }, [])

    return (
        <>
            <Helmet>
                <title> Biogas | View Slaves </title>
            </Helmet>
            {loading ? (
                <Loader />
            ) : slave.length > 0 ? (
                <>
                    <h1>Slaves of Device {deviceId}</h1>
                    {/* <TextField
                        label="Search by Description"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                        style={{ margin: "16px 0" }}
                    /> */}
                    <div style={{ height: '100%', width: '100%' }}>
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
                            // onRowClick={(params) => {handleRowClick(params.row)}}
                            
                        />
                    </div>
                </>
            ) : (
                <h1>No slaves</h1>
            )}
        </>
    )
}

export default SlaveListTable;