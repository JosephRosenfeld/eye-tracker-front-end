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
  const [time, setTime] = useState(new Date());
  const [dt, setDt] = useState(new Date());
  const [type, setType] = useState("placeholder");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='add-item-container'>
      <form className='add-item-content' onSubmit={onSubmit}>
        <div className='add-item-title'>Item Info</div>
        <ThemeProvider theme={theme}>
          <FormControl>
            <Select
              size='small'
              value={type}
              onChange={(e) => setType(e.target.value)}
              renderValue={
                type !== "placeholder"
                  ? undefined
                  : () => (
                      <div className='select-placeholder'>
                        Select the type of log item
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
              showTodayButton={true}
              renderInput={(params) => <TextField size='small' {...params} />}
              PopperProps={{ disablePortal: true }}
            />
            <TimePicker
              value={time}
              onChange={(newVal) => setTime(newVal)}
              renderInput={(params) => <TextField size='small' {...params} />}
              showTodayButton={true}
              PopperProps={{ disablePortal: true }}
            />
          </LocalizationProvider>
          <TextField
            size='small'
            multiline
            minRows={5}
            placeholder='Add a detailed description of the log item'
          />
        </ThemeProvider>
        <button className='add-item-button' type='submit'>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddSubPage;
