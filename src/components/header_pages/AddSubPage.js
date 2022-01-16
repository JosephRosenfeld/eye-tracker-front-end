import "./AddSubPage.css";

/*--- Utilities Imports ---*/
import { createTheme, ThemeProvider } from "@mui/material/styles";

/*--- Hooks imports ---*/
import { useState } from "react";

/*--- Components Imports ---*/
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34af4e",
    },
  },
});

const AddSubPage = () => {
  const [time, setTime] = useState(null);
  const [dt, setDt] = useState(null);
  const [dtTime, setDtTime] = useState(new Date());
  const [type, setType] = useState("placeholder");

  return (
    <div className='add-item-container'>
      <form className='add-item-content'>
        <div className='add-item-title'>Item Info</div>
        <ThemeProvider theme={theme}>
          <FormControl>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              renderValue={
                type !== "placeholder"
                  ? undefined
                  : () => (
                      <div className='select-placeholder'>
                        The type of log item
                      </div>
                    )
              }
            >
              <MenuItem value='Systane Eye Drop'>Systane Eye Drop</MenuItem>
              <MenuItem value='Muro Eye Drop'>Muro Eye Drop</MenuItem>
              <MenuItem value='Muro Ointment'>Muro Ointment</MenuItem>
              <MenuItem value='Erosion'>Erosion</MenuItem>
              <MenuItem value='Daily Review'>Daily Review</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              value={dt}
              onChange={(newVal) => {
                setDt(newVal);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              value={time}
              onChange={(newVal) => setTime(newVal)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            multiline
            minRows={3}
            placeholder='Add a more detailed description of the item you wish to log'
          />
        </ThemeProvider>
      </form>
    </div>
  );
};

export default AddSubPage;
