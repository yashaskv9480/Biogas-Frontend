import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { Card, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Iconify from "../../../components/iconify"; // Assuming you have an Iconify component

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

const R = () => {
  const [value, setValue] = useState(0.5); // Initial value

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random(); // Generate a random value between 0 and 1
      setValue(newValue);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      sx={{
        width: 400,height:350, // Change the width as needed
        margin: 2,
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
        }}
      >
        <Typography variant="subtitle1">Red</Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"Red"} width={24} height={24} />
      </StyledIcon>

      <GaugeChart
        id="gauge-chart1"
        style={{ height: 150, margin: 'auto', marginBottom: 50 }}
        nrOfLevels={20}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        // colors={["#FF5F6D", "#FF8C88", "#FFB2A2", "#FFD9BB", "#FFF1E6"]}
        colors={["#FFF1E6","#FFD9BB","#FFB2A2","#FF8C88","#FF5F6D"]}
        
        arcPadding={0.02}
        textColor="white"
        percent={value}
        label="R"
        hideText={1}
      />



      <div
        style={{
          background: "#cc0000", // Darker background for footer
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{`${(value * 100).toFixed(2)}  Watts`}</Typography>
      </div>
    </Card>
  );
};

export default R;