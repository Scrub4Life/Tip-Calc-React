import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import "./Splitter.css";

export default function Splitter() {
  const [formData, setFormData] = useState({
    bill: "",
    tipPercent: [5, 10, 15, 25, 50],
    numOfPeople: "",
    tipValue: 0,
  });

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;

    setFormData((currData) => {
      return {
        ...currData,
        [changeField]: newValue,
      };
    });
  };

  const reset = () => {
    setFormData({
      bill: "",
      tipPercent: [5, 10, 15, 25, 50],
      numOfPeople: "",
      tipValue: 0,
    });

    setTipAmount(0);
    setTotalAmount(0);
  };

  // rounding and setting the decimal places to 2
  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
      decimals
    );
  }

  useEffect(() => {
    // Recalculate tipAmount when dependent values change
    let newTipAmount = round(
      (formData.bill * (formData.tipValue / 100)) / formData.numOfPeople,
      2
    );
    setTipAmount(newTipAmount);

    // Recalculate totalAmount when dependent values change
    let newTotalAmount =
      formData.numOfPeople > 0
        ? round(
            (parseFloat(formData.bill) +
              formData.bill * (formData.tipValue / 100)) /
              formData.numOfPeople,
            2
          )
        : 0;
    setTotalAmount(newTotalAmount);

    console.log(`bill ${formData.bill}`);
    console.log(`tip value ${formData.tipValue}`);
    console.log(`num of people ${formData.numOfPeople}`);

    formData.bill === 0 ? setIsError(true) : setIsError(false);
  }, [formData.bill, formData.tipValue, formData.numOfPeople]);

  return (
    <>
      <h1 style={{ lineHeight: 1, letterSpacing: "10px", textAlign: "center" }}>
        SPLI
        <br />
        TTER
      </h1>
      {/* app container */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={0}
        backgroundColor="hsl(189, 41%, 97%)"
        borderRadius={5}
      >
        {/* 2nd container */}
        <Box display="flex" margin="1.5rem">
          {/* left box container */}
          <Box>
            <Stack spacing={3}>
              {/* bill input */}
              <p>Bill</p>
              <label
                htmlFor="bill"
                style={{ marginTop: "0", cursor: "none" }}
              ></label>
              <TextField
                id="outlined-basic"
                // label="Bill"
                variant="outlined"
                placeholder="0"
                onChange={handleChange}
                value={formData.bill}
                name="bill"
                style={{ marginTop: "0" }}
                inputProps={{ style: { textAlign: "right" } }}
                // color="green"
                // style={{ borderColor: customBorderColor }}
                // sx={{
                //   color: {customBorderColor}
                // }}
                error={isError}
                helperText={isError ? "Can't be zero" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {/* button group */}
              <p>Select Tip %</p>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: 0, paddingTop: 0, marginTop: "0" }}
              >
                {/* First ButtonGroup with the first three buttons */}
                <ButtonGroup
                  fullWidth
                  variant="contained"
                  aria-label="tip buttons"
                >
                  {formData.tipPercent.slice(0, 3).map((percent, index) => (
                    <>
                      <Button
                        key={index}
                        value={percent}
                        onClick={handleChange}
                        name="tipValue"
                        style={{
                          backgroundColor: "hsl(183, 100%, 15%)",
                          marginRight: index !== 2 ? "8px" : "0",
                          fontFamily: "space-mono",
                          fontWeight: "700",
                        }}
                      >
                        {percent}%
                      </Button>
                    </>
                  ))}
                </ButtonGroup>
              </Grid>
              {/* Second ButtonGroup with the last two buttons */}
              <Grid item xs={12} style={{ paddingLeft: 0, marginTop: "10px" }}>
                <ButtonGroup
                  fullWidth
                  variant="contained"
                  aria-label="tip buttons"
                >
                  {formData.tipPercent.slice(3).map((percent, index) => (
                    <>
                      <Button
                        key={index}
                        value={percent}
                        onClick={handleChange}
                        name="tipValue"
                        style={{
                          backgroundColor: "hsl(183, 100%, 15%)",
                          marginRight: index !== 2 ? "8px" : "0",
                          fontFamily: "space-mono",
                          fontWeight: "700",
                        }}
                      >
                        {percent}%
                      </Button>
                    </>
                  ))}
                {/* <TextField/> */}
                </ButtonGroup>
              </Grid>
              <p>Number of People</p>
              {/* number of people input */}
              <label
                htmlFor="Number of People"
                style={{ marginTop: "0" }}
              ></label>
              <TextField
                id="outlined-basic"
                // label="Number Of People"
                style={{ marginTop: "0", cursor: "none" }}
                inputProps={{ style: { textAlign: "right" } }}
                variant="outlined"
                placeholder="0"
                onChange={handleChange}
                value={formData.numOfPeople}
                name="numOfPeople"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
          {/* right box container */}
          <Box
            display="flex"
            flexDirection={"column"}
            marginLeft="20px"
            padding="0 20px"
            borderRadius="10px"
            backgroundColor="hsl(183, 100%, 15%)"
            position={"relative"}
            width={"300px"}
            boxSizing={"border-box"}
          >
            <Stack
              direction={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              spacing={"2"}
            >
              {/* left stack */}
              <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"baseline"}
                spacing={"2"}
              >
                <p
                  style={{
                    color: "white",
                    marginTop: "25px",
                  }}
                >
                  Tip Amount
                </p>
                <p
                  style={{
                    color: "lightslategray",
                    margin: "0",
                    marginBottom: "55px",
                    fontSize: "14px",
                  }}
                >
                  /person
                </p>

                <p
                  style={{
                    color: "white",
                    margin: "0",
                  }}
                >
                  Total
                </p>

                <p
                  style={{
                    color: "lightslategray",
                    margin: "0",
                    fontSize: "14px",
                  }}
                >
                  /person
                </p>
              </Stack>
              {/*right stack*/}
              <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                spacing={"2"}
              >
                <p
                  style={{
                    color: "hsl(172, 67%, 45%)",
                    marginTop: "15px",
                    marginBottom: "50px",
                    fontSize: "32px",
                  }}
                >
                  ${tipAmount === 0 ? "0.00" : tipAmount}
                </p>

                <p
                  style={{
                    color: "hsl(172, 67%, 45%)",

                    fontSize: "32px",
                  }}
                >
                  ${totalAmount === 0 ? "0.00" : totalAmount}
                </p>
              </Stack>

              {/* Reset button */}
              <Button
                variant="outlined"
                onClick={reset}
                style={{
                  color: "hsl(183, 100%, 15%)",
                  fontFamily: "space-mono",
                  fontWeight: "700",
                  backgroundColor: "hsl(172, 67%, 45%)",
                  position: "absolute",
                  bottom: "10px",
                  width: "87%",
                }}
              >
                RESET
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
