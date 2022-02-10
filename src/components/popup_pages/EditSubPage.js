import "./EditSubPage.css";

/*--- Utilities Imports ---*/
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";

/*--- Hooks imports ---*/
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/*--- Actions Imports ---*/
import { updateLog, deleteLog } from "../../redux/actions/logsActions";

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

const EditSubPage = () => {
  console.log("edit rerender");

  /*--- Initialization and Configuration ---*/
  const dispatch = useDispatch();
  //Get logId from url
  const params = useParams();
  const logId = params.logId;
  //Configure local state vars
  const [editable, setEditable] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [haveSubmitted, setHaveSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [haveDeleted, setHaveDeleted] = useState(false);
  const [submissionTxt, setSubmissionTxt] = useState("");
  //Get cur log data from redux data store
  const savedLog = useSelector((state) =>
    state.logs.logs.find((log) => log.log_id === logId)
  );
  console.log(savedLog);
  //Set local log from state based on global state
  const [formLog, setFormLog] = useState({
    logId: savedLog?.log_id,
    type: savedLog?.log_type_name || null,
    time: moment(savedLog?.log_datetime),
    dt: moment(savedLog?.log_datetime),
    rating: savedLog?.rating,
    desc: savedLog?.log_description,
  });
  console.log(formLog);

  useEffect(() => {
    //If redux log updates, reset form log with global state savedLog
    setFormLog({
      logId: savedLog?.log_id,
      type: savedLog?.log_type_name || null,
      time: moment(savedLog?.log_datetime),
      dt: moment(savedLog?.log_datetime),
      rating: savedLog?.rating,
      desc: savedLog?.log_description,
    });
  }, [savedLog]);

  //Date constants
  const maxDate = moment(new Date("12/31/2099"));
  const minDate = moment(new Date("1/1/1900"));

  /*--- onChange Function ---*/
  //need backupName and backupVal for date time pickers
  const onChange = (e = null, backupName, backupVal) => {
    let name = e?.target.name || backupName;
    let value = e?.target.value || backupVal;

    //When type changes we reset rating and description
    if (name == "type") {
      setFormLog({
        ...formLog,
        [name]: value,
        rating: "placeholder",
        desc: "",
      });
    } else {
      setFormLog({ ...formLog, [name]: value });
    }
    /*If we've already tried to submit then display errors on change*/
    if (haveSubmitted) {
      setFormErrors(validate({ ...formLog, [name]: value }));
    }
  };

  /*--- Submit Function ---*/
  const onSubmit = (e) => {
    e.preventDefault();
    /*We set haveSubmitted to true in order to let the onChange func
    to know it should update errors on each change, not wait till a submit*/
    setHaveSubmitted(true);
    //update error state in order to rerender form
    const errors = validate(formLog);
    setFormErrors(errors);

    /*If there aren't errors, set editable to false, set have submitted to false,
    and update redux store*/
    if (Object.keys(errors).length === 0) {
      setSubmitSuccess(true);
      setSubmissionTxt("Your item was successfully updated!");
      setEditable(false);

      //update redux store
      dispatch(
        updateLog(formLog.logId, {
          type: formLog.type == "placeholder" ? null : formLog.type,
          time: formLog.time.format(),
          dt: formLog.dt.format(),
          rating: formLog.rating == "placeholder" ? null : formLog.rating,
          desc: formLog.desc,
        })
      );
    }
  };

  /*--- Validate Function ---*/
  const validate = (formLog) => {
    const errors = {};
    //defining validation regex's
    const whiteSpaceReg = /^\s*$/;

    if (
      formLog.type == "Daily Review" ||
      formLog.type == "Note" ||
      formLog.type == "Erosion"
    ) {
      if (formLog.desc == "" || whiteSpaceReg.test(formLog.desc)) {
        errors.desc = "This field is required";
      }
      if (formLog.type == "Daily Review") {
        if (formLog.rating == "placeholder") {
          errors.rating = "This field is required";
        }
      }
    }
    if (formLog.type == "placeholder") {
      errors.type = "This field is required";
    }
    if (!formLog.time?.isValid()) {
      errors.time = "Invalid time";
    }
    if (formLog.dt?.diff(maxDate) > 0 || formLog.dt?.diff(minDate) < 0) {
      errors.dt = "Date out of range";
    }
    if (!formLog.dt?.isValid()) {
      errors.dt = "Invalid date";
    }

    return errors;
  };

  /*--- Reset Function ---*/
  const reset = () => {
    setFormLog({
      logId: savedLog?.log_id,
      type: savedLog?.log_type_name,
      time: moment(savedLog?.log_datetime),
      dt: moment(savedLog?.log_datetime),
      rating: savedLog?.rating,
      desc: savedLog?.log_description,
    });
    setHaveSubmitted(false);
    setFormErrors({});
  };

  return (
    <div className='edit-item-container'>
      <form className='edit-item-content' onSubmit={onSubmit}>
        {!haveDeleted && savedLog && (
          <>
            <div className='edit-item-title'>Item Info</div>
            <ThemeProvider theme={theme}>
              <div className='edit-item-input-group'>
                <FormControl>
                  <Select
                    value={formLog.type}
                    onChange={onChange}
                    name='type'
                    disabled={!editable}
                    error={!!formErrors.type}
                  >
                    <MenuItem value='Systane Eye Drop'>
                      Systane Eye Drop
                    </MenuItem>
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
                <div className='edit-item-input-group'>
                  <DatePicker
                    value={formLog.dt}
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
                <div className='edit-item-input-group'>
                  <TimePicker
                    value={formLog.time}
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
              {formLog.type == "Daily Review" && (
                <div className='edit-item-input-group'>
                  <FormControl>
                    <Select
                      value={formLog.rating}
                      onChange={onChange}
                      name='rating'
                      renderValue={
                        formLog.rating !== "placeholder"
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
              {(formLog.type == "Erosion" ||
                formLog.type == "Note" ||
                formLog.type == "Daily Review") && (
                <div className='edit-item-input-group'>
                  <TextField
                    value={formLog.desc}
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
          </>
        )}
        {!haveDeleted && !submitSuccess && savedLog && (
          <div className='edit-page-button-group'>
            {!editable && (
              <>
                <button
                  className='edit-button edit-page-button'
                  type='button'
                  onClick={(e) => {
                    setEditable(true);
                  }}
                >
                  Edit Log
                </button>
                <button
                  className='delete-button edit-page-button'
                  type='button'
                  onClick={(e) => {
                    setHaveDeleted(true);
                    setSubmissionTxt("Your item was successfully deleted!");
                    dispatch(deleteLog(formLog.logId));
                  }}
                >
                  Delete Log
                </button>
              </>
            )}
            {editable && (
              <>
                <button type='submit' className='save-button edit-page-button'>
                  Save
                </button>
                <button
                  type='button'
                  className='cancel-button edit-page-button'
                  onClick={(e) => {
                    setEditable(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
        {(submitSuccess || haveDeleted) && (
          <div className='submission-txt'>{submissionTxt}</div>
        )}
      </form>
    </div>
  );
};

export default EditSubPage;
