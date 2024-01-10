import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom/dist";
import Biogasapi from "../apis/Biogasapi";
import Loader from "../../components/loading/Loading";
import GeneratePDF from "./GeneratePDF";


const columns = [
  { id: 1, field: 'device_id', headerName: 'Device ID', flex: 1 },
  { id: 8, field: 'weight', headerName: 'Weight', flex: 1 },
  { id: 9, field: 'dtime', headerName: 'Time', flex: 1 },
];

const Report = () => {
  const [sensorvalues, setSensorValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    console.log("Clicked row: ", rowData.id);
    const encodeDeviceId = encodeURIComponent(rowData.id);
    console.log(encodeDeviceId);
    window.open(`../../sensor-value/${encodeDeviceId}`, "_blank");
  };



  const navigateHandle = () => {
    if (!startDate.trim()) {
      alert("Please enter the start Date.");
      return; }
    GeneratePDF(sensorvalues, startDate, endDate);


  };

  useEffect(() => {
    const fetchDevicesList = async () => {
      const uid = Cookies.get('uid');
      try {
        const response = await Biogasapi.get("/sensor_values");

        if (!response.error) {
          const uniqueSensorValues = response.data.map((value, index) => ({
            ...value,
            id: `${value.device_id}_${index}`,
          }));
          setSensorValues(uniqueSensorValues);
        }
        console.log(response);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevicesList();
  }, []);

  const tableColumn = ["Device_Id", "Weight", "Time"];
  const tableRows = [];

  sensorvalues.forEach((sensorvalue) => {
    const dateString = sensorvalue.dtime;

    if (!dateString) {
      // Handle the case where dateString is null or undefined
      return;
    }

    const [day, month, yearTime] = dateString.split('/');

    if (!day || !month || !yearTime) {
      // Handle the case where day, month, or yearTime is null or undefined
      console.error("Invalid date format:", dateString);
      return;
    }

    const [year, time] = yearTime.split(' ');

    if (!year || !time) {
      // Handle the case where year or time is null or undefined
      console.error("Invalid date format:", dateString);
      return;
    }

    const [hour, minute, second] = time.split(':');

    if (!hour || !minute || !second) {
      // Handle the case where hour, minute, or second is null or undefined
      console.error("Invalid time format:", time);
      return;
    }
  // Assuming the year is in the format YY
    const fullYear = parseInt(year,10) + 2000;
    const dateOnly = `${fullYear}-${month}-${day}`
    // const dateOnly = dateObject.toISOString().split('T')[0]

  if(startDate){
    console.log(dateOnly);
    console.log(startDate);
    console.log(dateOnly === startDate)
  }


    if (!endDate && dateOnly === startDate) {
      const sensorvalueData = [
        sensorvalue.device_id || "",
        sensorvalue.weight || "",
        sensorvalue.dtime || "",
      ];
      tableRows.push(sensorvalueData);
    } else if (dateOnly >= startDate && dateOnly <= endDate) {
      const sensorvalueData = [
        sensorvalue.device_id || "",
        sensorvalue.weight || "",
        sensorvalue.dtime || "",
      ];
      tableRows.push(sensorvalueData);
    }
  });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    return (
      <>
        <Helmet>
          <title>Biogas | Report</title>
        </Helmet>
        <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ marginRight: '8px' }}>From:</div>
          <TextField
              label=""
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
          />
          <div style={{ marginLeft: '16px', marginRight: '8px' }}>To:</div>
          <TextField
              label=""
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
          />
      </div>
      <Button
          variant="contained"
          onClick={navigateHandle}
          style={{ marginLeft: '1px', marginTop: '10px' }}
      >
          Export to PDF
      </Button>
          <Button
                variant="contained"
                onClick={() => {
                  if (!startDate.trim()) {
                    alert("Please enter the start Date.");
                    return;}
                  const csvData = [tableColumn, ...tableRows];
                  // Adjust the filename as needed
                  const filename = `${dateStr}.csv`;
                  const csvLink = document.createElement("a");
                  const blob = new Blob([csvData.join("\n").replace(/,/g, ";")], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);
                  csvLink.setAttribute("href", url);
                  csvLink.setAttribute("download", filename);
                  document.body.appendChild(csvLink);
                  csvLink.click();
                  document.body.removeChild(csvLink);
                }}
                style={{
                  marginLeft: '10px',
                  marginTop: '10px',
                }}
          >
            Export to CSV
        </Button>

      </div>
      {loading ? (
        <Loader />
      ) : sensorvalues.length > 0 ? (
        <>
          <h1>Report</h1>
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={sensorvalues}
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
              onRowClick={(params) => { handleRowClick(params.row) }}
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
