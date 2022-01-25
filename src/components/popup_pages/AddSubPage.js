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
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34af4e",
    },
  },
});

const AddSubPage = () => {
  const [type, setType] = useState("placeholder");
  const [time, setTime] = useState(new Date());
  const [dt, setDt] = useState(new Date());
  const [rating, setRating] = useState("placeholder");
  const [desc, setDesc] = useState("");

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
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setRating("placeholder");
                setDesc("");
              }}
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
              <MenuItem value='Note'>Note</MenuItem>
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
              renderInput={(params) => <TextField {...params} />}
              PopperProps={{ disablePortal: true }}
            />
            <TimePicker
              value={time}
              onChange={(newVal) => setTime(newVal)}
              renderInput={(params) => <TextField {...params} />}
              showTodayButton={true}
              PopperProps={{ disablePortal: true }}
            />
          </LocalizationProvider>
          {type == "Daily Review" && (
            <FormControl>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                renderValue={
                  rating !== "placeholder"
                    ? undefined
                    : () => (
                        <div className='select-placeholder'>
                          Rating (with 5 being the best)
                        </div>
                      )
                }
              >
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='1'>1</MenuItem>
              </Select>
            </FormControl>
          )}
          {(type == "Erosion" || type == "Note" || type == "Daily Review") && (
            <TextField
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              multiline
              minRows={5}
              inputProps={{ maxLength: 1000 }}
              placeholder='Add a detailed description of the log item'
            />
          )}
        </ThemeProvider>
        <button className='add-item-button' type='submit'>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddSubPage;
