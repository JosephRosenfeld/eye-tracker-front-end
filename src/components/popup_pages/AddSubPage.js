import "./AddSubPage.css";

/*--- Utilities Imports ---*/
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";

/*--- Hooks imports ---*/
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/*--- Actions Imports ---*/
import { createLog } from "../../redux/actions/logsActions";

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
  console.log("rerender");

  /*--- Initialization and Configuration ---*/
  const [editable, setEditable] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [newLog, setNewLog] = useState({
    type: "placeholder",
    time: moment(),
    dt: moment(),
    rating: "placeholder",
    desc: "",
  });
  const [haveSubmitted, setHaveSubmitted] = useState(false);
  //Date constants
  const maxDate = moment(new Date("12/31/2099"));
  const minDate = moment(new Date("1/1/1900"));

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    setHaveSubmitted(true);

    //update error state in order to rerender form
    const errors = validate(newLog);
    setFormErrors(errors);

    /*If there aren't errors, set editable to false, set have submitted to false,
    and update redux store*/
    if (Object.keys(errors).length === 0) {
      setEditable(false);

      //update redux store
      dispatch(
        createLog({
          type: newLog.type == "placeholder" ? null : newLog.type,
          time: newLog.time.format(),
          dt: newLog.dt.format(),
          rating: newLog.rating == "placeholder" ? null : newLog.rating,
          desc: newLog.desc,
        })
      );
    }
  };

  /*--- onChange Function ---*/
  //need backupName and backupVal for date time pickers
  const onChange = (e = null, backupName, backupVal) => {
    let name = e?.target.name || backupName;
    let value = e?.target.value || backupVal;

    //When type changes we reset rating and description
    if (name == "type") {
      setNewLog({ ...newLog, [name]: value, rating: "placeholder", desc: "" });
    } else {
      setNewLog({ ...newLog, [name]: value });
    }
    /*If we've already tried to submit then display errors on change*/
    if (haveSubmitted) {
      setFormErrors(validate({ ...newLog, [name]: value }));
    }
  };

  /*--- Validate Function ---*/
  const validate = (newLog) => {
    const errors = {};
    //defining validation regex's
    const whiteSpaceReg = /^\s*$/;

    if (
      newLog.type == "Daily Review" ||
      newLog.type == "Note" ||
      newLog.type == "Erosion"
    ) {
      if (newLog.desc == "" || whiteSpaceReg.test(newLog.desc)) {
        errors.desc = "This field is required";
      }
      if (newLog.type == "Daily Review") {
        if (newLog.rating == "placeholder") {
          errors.rating = "This field is required";
        }
      }
    }
    if (newLog.type == "placeholder") {
      errors.type = "This field is required";
    }
    if (!newLog.time?.isValid()) {
      errors.time = "Invalid time";
    }
    if (newLog.dt?.diff(maxDate) > 0 || newLog.dt?.diff(minDate) < 0) {
      errors.dt = "Date out of range";
    }
    if (!newLog.dt?.isValid()) {
      errors.dt = "Invalid date";
    }

    return errors;
  };

  /*--- Clear Function ---*/
  const clear = () => {
    setNewLog({
      type: "placeholder",
      time: moment(),
      dt: moment(),
      rating: "placeholder",
      desc: "",
    });
  };

  /*--- Scroll Up When Poppers Closed ---*/
  //Makes the UX feel less snappy
  // const containerRef = useRef();
  // const onClose = () => {
  //   console.log("onClose");
  //   if (
  //     newLog.type != "Erosion" &&
  //     newLog.type != "Note" &&
  //     newLog.type != "Daily Review"
  //   ) {
  //     containerRef.current.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <div className='add-item-container'>
      <form className='add-item-content' onSubmit={onSubmit}>
        <div className='add-item-title'>Item Info</div>
        <ThemeProvider theme={theme}>
          <div className='add-item-input-group'>
            <FormControl>
              <Select
                value={newLog.type}
                onChange={onChange}
                name='type'
                renderValue={
                  newLog.type !== "placeholder"
                    ? undefined
                    : () => (
                        <div className='select-placeholder'>
                          Select the type of log item
                        </div>
                      )
                }
                disabled={!editable}
                error={!!formErrors.type}
              >
                <MenuItem value='Systane Eye Drop'>Systane Eye Drop</MenuItem>
                <MenuItem value='Muro Eye Drop'>Muro Eye Drop</MenuItem>
                <MenuItem value='Muro Ointment'>Muro Ointment</MenuItem>
                <MenuItem value='Erosion'>Erosion</MenuItem>
                <MenuItem value='Note'>Note</MenuItem>
                <MenuItem value='Daily Review'>Daily Review</MenuItem>
              </Select>
            </FormControl>
            <span className='error-txt'>{formErrors.type}</span>
          </div>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <div className='add-item-input-group'>
              <DatePicker
                value={newLog.dt}
                showTodayButton={true}
                onChange={(newVal) => {
                  onChange(null, "dt", newVal);
                }}
                renderInput={(params) => <TextField {...params} />}
                PopperProps={{
                  placement: "auto",
                  disablePortal: true,
                  style: { top: "20px" },
                }}
                disabled={!editable}
                error={!!formErrors.dt}
              />
              <span className='error-txt'>{formErrors.dt}</span>
            </div>
            <div className='add-item-input-group'>
              <TimePicker
                value={newLog.time}
                onChange={(newVal) => {
                  onChange(null, "time", newVal);
                }}
                renderInput={(params) => <TextField {...params} />}
                showTodayButton={true}
                PopperProps={{
                  disablePortal: true,
                }}
                disabled={!editable}
                error={!!formErrors.time}
              />
              <span className='error-txt'>{formErrors.time}</span>
            </div>
          </LocalizationProvider>
          {newLog.type == "Daily Review" && (
            <div className='add-item-input-group'>
              <FormControl>
                <Select
                  value={newLog.rating}
                  onChange={onChange}
                  name='rating'
                  renderValue={
                    newLog.rating !== "placeholder"
                      ? undefined
                      : () => (
                          <div className='select-placeholder'>
                            Rating (with 5 being the best)
                          </div>
                        )
                  }
                  disabled={!editable}
                  error={!!formErrors.rating}
                >
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                </Select>
              </FormControl>
              <span className='error-txt'>{formErrors.rating}</span>
            </div>
          )}
          {(newLog.type == "Erosion" ||
            newLog.type == "Note" ||
            newLog.type == "Daily Review") && (
            <div className='add-item-input-group'>
              <TextField
                value={newLog.desc}
                onChange={onChange}
                name='desc'
                multiline
                minRows={5}
                inputProps={{ maxLength: 1000 }}
                placeholder='Add a detailed description of the log item'
                disabled={!editable}
                error={!!formErrors.desc}
              />
              <span className='error-txt'>{formErrors.desc}</span>
            </div>
          )}
        </ThemeProvider>
        {editable && (
          <button className='add-item-button' type='submit'>
            Add Item
          </button>
        )}
        {!editable && (
          <div className='submission-txt'>
            Your item was submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default AddSubPage;
