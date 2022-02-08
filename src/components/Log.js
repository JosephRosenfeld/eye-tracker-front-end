import "./Log.css";

/*--- Hooks Imports ---*/
import { useSelector } from "react-redux";

/*--- Component Imports ---*/
import { Link } from "react-router-dom";

const Log = ({ log, pos, z }) => {
  /*Extract Settings*/
  const typeMap = useSelector((state) => {
    return {
      abrevs: {
        "Systane Eye Drop": state.settings.settings_obj.systane_abbreviation,
        "Muro Eye Drop": state.settings.settings_obj.muro_abbreviation,
        "Muro Ointment": state.settings.settings_obj.muro_ointment_abbreviation,
        Erosion: state.settings.settings_obj.erosion_abbreviation,
        Note: state.settings.settings_obj.note_abbreviation,
        "Daily Review": state.settings.settings_obj.daily_review_abbreviation,
      },
      colors: {
        "Systane Eye Drop": state.settings.settings_obj.systane_color,
        "Muro Eye Drop": state.settings.settings_obj.muro_color,
        "Muro Ointment": state.settings.settings_obj.muro_ointment_color,
        Erosion: state.settings.settings_obj.erosion_color,
        Note: state.settings.settings_obj.note_color,
        "Daily Review1": state.settings.settings_obj.daily_review1_color,
        "Daily Review2": state.settings.settings_obj.daily_review2_color,
        "Daily Review3": state.settings.settings_obj.daily_review3_color,
        "Daily Review4": state.settings.settings_obj.daily_review4_color,
        "Daily Review5": state.settings.settings_obj.daily_review5_color,
      },
    };
  });

  //Calculate top offset
  const total = 25;
  const dt = new Date(log.log_datetime);
  const hrs = dt.getHours();
  const mins = dt.getMinutes();
  const topOffset = (0.25 + (hrs + mins / 60)) * 60;

  //Calculate color
  const colorKey =
    log.log_type_name == "Daily Review"
      ? log.log_type_name + log.rating
      : log.log_type_name;

  return (
    <div
      className='log'
      style={{
        top: topOffset + "px",
        zIndex: z * 3,
      }}
    >
      {/*Needed to make three seperate components in order to get the borders to line up.
      hr element has a z-index greater than the log-label element. log-label has the border.
      and on top of both of those is the log-label-txt */}
      <hr
        className='log-line'
        style={{
          border: "none",
          backgroundColor: typeMap.colors[colorKey],
          height: "3px",
          zIndex: z * 3 + 1,
        }}
      ></hr>
      <Link to={`edit/${log.log_id}`}>
        <div
          className='log-label'
          style={{
            backgroundColor: typeMap.colors[colorKey],
            left: pos * 100 + "%",
            zIndex: z * 3,
          }}
        ></div>
        <div
          className='log-label-txt'
          style={{
            left: pos * 100 + "%",
            zIndex: z * 3 + 2,
          }}
        >
          {typeMap.abrevs[log.log_type_name]}
        </div>
      </Link>
    </div>
  );
};

export default Log;
