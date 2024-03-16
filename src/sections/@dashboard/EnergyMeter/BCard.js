import { Card, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "../../../components/iconify";
import Biogasapi from "../../../pages/apis/Biogasapi";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(10), 
  height: theme.spacing(10), 
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`,
}));

const BCard = ({keys,deviceId}) => {
  const [b,setb] = useState(0.0)
  const [value, setValue] = useState(0.5); // Initial value


  // Simulate live data updates
  useEffect(() => {
    const fetchrecentvalues = async () => {
      try {
        const response = await Biogasapi.get(`/dashboard/${keys}/${deviceId}`);
  
          if (!response.error) {

            const firstSensorValue = response.data;

            setb(firstSensorValue.value ? firstSensorValue.value : 0.0);            

          }
      } catch (err) {
          console.error(err.message);
      } 
  };

    const interval = setInterval(() => {
      fetchrecentvalues();

    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setValue(b);
  }, [b]);

  return (
    <Card
      sx={{
        width: "100%", height:300,  
        margin: 0,
        marginTop:2,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        boxShadow: 20,
        color: "black",
        bgcolor: "#74c0fc", 
      }}
    >
      <div
        style={{
          background: "#3498db", 
          padding: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1"><h4>Blue</h4></Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"Blue"} width={24} height={24} />
      </StyledIcon>

      <div
        style={{
          padding: "10px",
          textAlign: "center",
          height: 150, margin: 'auto', marginBottom: 50,
          
        }}
      >
        <Typography variant="h4">{`${(value).toFixed(2)}  Volts`}</Typography>
      </div>
    </Card>
  );
};

export default BCard;
