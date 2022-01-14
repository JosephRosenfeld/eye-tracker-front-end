import "./AddSubPage.css";

/*--- Hooks imports ---*/
import { useState } from "react";

/*--- Components Imports ---*/
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddSubPage = () => {
  const [time, setTime] = useState(new Date());
  const [dt, setDt] = useState(null);
  const [dtTime, setDtTime] = useState(new Date());
  const [type, setType] = useState("");

  return (
    <div className='add-item-container'>
      <form className='add-item-content'>
        <div className='add-item-title'>Item Info</div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            value={time}
            onChange={(newVal) => setTime(newVal)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            value={dt}
            onChange={(newVal) => {
              setDt(newVal);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            value={dtTime}
            onChange={(newVal) => {
              setDtTime(newVal);
            }}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
        <FormControl>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='Systane Eye Drop'>Systane Eye Drop</MenuItem>
            <MenuItem value='Muro Eye Drop'>Muro Eye Drop</MenuItem>
            <MenuItem value='Muro Ointment'>Muro Ointment</MenuItem>
          </Select>
        </FormControl>
        <TextField />
        <div className='add-form-item'>
          <label>DATE</label>
          <input type='date'></input>
        </div>
        <div className='add-form-item'>
          <label>TIME</label>
          <input type='time'></input>
        </div>
        <div className='add-form-item'>
          <label>NOTES</label>
          <textarea name='notes'></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddSubPage;
