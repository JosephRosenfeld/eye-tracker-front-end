import "./InfoSubPage.css";

const InfoSubPage = () => {
  return (
    <div className='info-container'>
      <div className='info-content'>
        <div className='info-title'>How the Eye Tracker was Created</div>
        <div className='info-subtitle'>The Setup</div>
        <div className='info-text'>
          The inspiration for the Eye Tracker came from my own experiences after
          having eye surgery in 2020.
        </div>
        <div className='info-text'>
          After my surgery I was prescribed several eye drops to ensure
          everything healed properly.
        </div>
        <div className='info-text'>
          But with so many different drops to take, I often forget which ones I
          had or hadn't taken for that day.
        </div>
        <div className='info-text'>
          To make matters worse, I started getting erosions (small tears in the
          eye). Erosions only last a few hours; however, they push back your
          recovery by several months.
        </div>
        <div className='info-subtitle'>Problems</div>
        <div className='info-text'>
          <strong>1. </strong>There are too many eye drops to take and no way to
          track or make sure I took the right amount for that day.
          <br />
          <br />
          <strong>2. </strong>I often forget when my last erosion occurred,
          making it hard for me to track if my eye health is improving.
          <br />
          <br />
          <strong>3. </strong>An erosion is typically preceded by a few days
          where the eyes feel irritated or dry. This is a good warning sign that
          an erosion is on the way, but its tough to keep track of all this
          data.
        </div>
        <div className='info-subtitle'>Solution</div>
        <div className='info-text'>
          Design an application that can track everything. Track the eye drops,
          the erosions, and even how my eyes were feeling that day. Thus the Eye
          Tracker was born.
        </div>
        <div className='info-title'>How to Use the Eye Tracker</div>
        <div className='info-subtitle'>General</div>
        <div className='info-text'>
          The Eye Tracker is designed in a calendar format with both a yearly
          and daily view.
        </div>
        <div className='info-text'>
          To navigate between different periods on either view, simply click the
          left and right arrows shown in the header.
        </div>
        <div className='info-text'>
          To navigate between either view, use the dropdown in the header or the
          option in the side panel for mobile.
        </div>
        <div className='info-subtitle'>Yearly View</div>
        <div className='info-text'>
          On the yearly view, days are color coded based on the rating assigned
          to that day.
        </div>
        <div className='info-text'>
          Days with erosions can also be easily identified by their solid square
          border.
        </div>
        <div className='info-text'>
          In order to view a specific date on the daily view, simply find that
          day on the yearly view and double-click it.
        </div>
        <div className='info-subtitle'>Daily View</div>
        <div className='info-text'>
          With the daily view one can easily see which eye drops have been taken
          based on the different 'logs' shown.
        </div>
        <div className='info-text'>
          Each log item has a customizable color and abbreviation that can be
          changed in the settings pane.
        </div>
        <div className='info-text'>
          To edit a log item, simply click on the circle containing it's
          abbreviation.
        </div>
        <div className='info-subtitle'>Logs</div>
        <div className='info-text'>
          Log items are the cornerstone of this entire application.
        </div>
        <div className='info-text'>
          In order to create a log item, simply navigate to the Add Item page
          shown in the header or side panel if on mobile.
        </div>
        <div className='info-text'>
          Log items can have one of 6 types:
          <br />
          <br />
          1. Systane Eye Drop
          <br />
          2. Muro Eye Drop
          <br />
          3. Muro Ointment
          <br />
          4. Erosion
          <br />
          5. Note
          <br />
          6. Daily Review
        </div>
        <div className='info-text'>
          Depending on which log item type is selected, additional fields may
          display, however every log item will have a date and time field.
        </div>
        <div className='info-text'>
          To log an item not listed above, select the Note log item and write
          additional information as to what is being recorded in the description
          field.
        </div>
        <div className='info-text'>
          Utilize the Daily Review log item in order to assign a rating for that
          specific day.
        </div>
        <div className='info-text'>
          If multiple Daily Review log items are assigned to one day, the most
          recent one will be color-coded onto the yearly view.
        </div>
        <div className='info-title'>Additional Information</div>
        <div className='info-text'>
          To read more technical notes concerning this project, such as
          architecture decisions or tech stack, please review the README on
          github linked here: {"  "}
          <a
            href='https://github.com/JosephRosenfeld/eye-tracker-front-end'
            target='_blank'
          >
            https://github.com/JosephRosenfeld/eye-tracker-front-end
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoSubPage;
