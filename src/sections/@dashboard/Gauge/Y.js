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

const Y = () => {
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
        width: 400, height: 350, // Change the width as needed
        margin: 2,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        boxShadow: 20,
        color: "black", // Font color is black
        bgcolor: "#F0E68C", // Lighter yellow background color
      }}
    >
      <div
        style={{
          background: "#ffd43b", // Darker background for header (similar to yellow)
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">Yellow</Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"Yellow"} width={24} height={24} />
      </StyledIcon>

      <GaugeChart
        id="gauge-chart2"
        style={{ height: 150, margin: 'auto', marginBottom: 50 }}
        nrOfLevels={20}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        colors={["#FFF8E6", "#FFECBB", "#FFDAAD", "#FFCC88", "#FFC06D"]}
        arcPadding={0.02}
        textColor="white"
        percent={value}
        label="Y"
        hideText={1}
      />

      <div
        style={{
          background: "#ffd43b", // Darker background for footer (similar to yellow)
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{`${(value * 100).toFixed(2)}  Watts`}</Typography>
      </div>
    </Card>
  );
};

export default Y;
