import { Card, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "../../../components/iconify"; // Assuming you have an Iconify component
import Biogasapi from "../../../pages/apis/Biogasapi";


const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(10), // Increase the width of the icon
  height: theme.spacing(10), // Increase the height of the icon
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`,
}));

const GaugePopup = styled("div")({
  height: 150,
  margin: "auto",
  marginBottom: 50,
  transition: "transform 0.3s ease-in-out",
});

const RCard = ({keys,deviceId}) => {
  const [r,setr] = useState(0.0)
  const [value, setValue] = useState(0.5); // Initial value
  const [isPopped, setIsPopped] = useState(false);


  // Simulate live data updates
  useEffect(() => {
    const fetchrecentvalues = async () => {
      try {
        const response = await Biogasapi.get(`/dashboard/${keys}/${deviceId}`);
  
          if (!response.error) {

            const firstSensorValue = response.data;

            // Update only the 'r' value in the state
            setr(firstSensorValue.value ? firstSensorValue.value : 0.0);            
        //    console.log(firstSensorValue.r)

          }
      } catch (err) {
          console.error(err.message);
      } 
  };

    const interval = setInterval(() => {
      fetchrecentvalues();
  //    console.log(r)

    }, 5000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
//    console.log(r); // You can remove or modify this line
    setValue(r);
    setIsPopped(true);

    // Reset the popping effect after a short delay
    setTimeout(() => {
      setIsPopped(false);
    }, 300);
  }, [r]);

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
        color: "white",
        bgcolor: "#DC4C64", // Smooth dark red background
      }}
    >
      <div
        style={{
          background: "#cc0000", // Darker background for header
          padding: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         }}
      >
        <Typography variant="subtitle1"><h4>Red</h4></Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"Red"} width={24} height={24} />
      </StyledIcon>

      <div
        style={{
          padding: "10px",
          textAlign: "center",
          height: 150, margin: 'auto', marginBottom: 50,
          
        }}
      >
        <Typography variant="h4">
          {`${(value).toFixed(2)} Volts`}
        </Typography>
      </div>
    </Card>
  );
};

export default RCard;
