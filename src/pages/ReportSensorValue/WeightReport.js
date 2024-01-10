import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/loading/Loading";
import Biogasapi from "../apis/Biogasapi";


const columns = [
  { id: 1, field: 'device_id', headerName: 'Device ID', flex: 1 },
  { id: 8, field: 'value', headerName: 'Weight', flex: 1 },
  { id: 9, field: 'd_time', headerName: 'Time', flex: 1 },
];

const Report = () => {
  const [weightvalues, setweightvalues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchweightList = async () => {
      try {
        const response = await Biogasapi.get("/weight-logging");
  
        if (!response.error) {
          const uiniqueweightvalues = response.data.map((value, index) => ({
            ...value,
            id: `${value.device_id}_${index}`,
            ...(value.dtime && { dtime: formatDateString(value.dtime) }),
          }));
          setweightvalues(uiniqueweightvalues);
        }
        console.log(response);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const formatDateString = (inputDateString) => {
      const inputDate = new Date(inputDateString);
      
      const year = inputDate.getFullYear().toString().slice(-2);
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDate.getDate().toString().padStart(2, '0');
      const hours = inputDate.getHours().toString().padStart(2, '0');
      const minutes = inputDate.getMinutes().toString().padStart(2, '0');
      const seconds = inputDate.getSeconds().toString().padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
  
    fetchweightList();
  }, []);
    

    return (
      <>
        <Helmet>
          <title>Biogas | Logged Weight</title>
        </Helmet>
      {loading ? (
        <Loader />
      ) : weightvalues.length > 0 ? (
        <>
          <h1>Logged Weight</h1>
          <div style={{ height: 700, width: '50%',marginLeft:'20%' }}>
            <DataGrid
              rows={weightvalues}
              columns={columns}
              pageSize={10}
              sx={{
                boxShadow: 4,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
        </>
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
};

export default Report;
