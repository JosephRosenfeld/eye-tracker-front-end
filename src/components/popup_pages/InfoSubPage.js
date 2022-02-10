import "./InfoSubPage.css";

const InfoSubPage = () => {
  return (
    <div className='info-container'>
      <div className='info-content'>
        <div className='info-title'>Welcome to the Eye Tracker!</div>
        <div className='info-text'>
          Hello, and welcome to the Eye Tracker, an application which makes it
          easy to track your eye health as you go about your daily life.
        </div>
        <div className='info-text'>
          The inspiration for this project actually came from my own experiences
          after having eye surgery in 2020. I had this eye surgery to correct my
          vision and allow me to see clearly without the aid of contacts or
          glasses
        </div>
        <div className='info-text'>
          As with any surgery, there were several things that I needed to do
          after my operation in order to make sure everything healed properly.
          This involved several eye drops and medications that I struggled to
          keep track of.
        </div>
        <div className='info-text'>
          To make matters worse about 5 months after my surgery, I woke up in
          the morning with an intense pain in my left eye, what we in the eye
          business call an erosion. The erosions only last a few hours, however,
          they do push your recovery date farther back and require you to be
          more aggressive with your post operation eye drops and medication.
        </div>
        <div className='info-subtitle'>Problems</div>
        <div className='info-text'>
          <strong>1. </strong>With so many different eye drops and medications
          that need to be taken, its easy to forget wether or not I've applied
          the correct amount that day.
          <br />
          <br />
          <strong>2. </strong>I will often forget when my last erosion was or my
          past erosion history. This makes it harder for me to track my progress
          and see if my eyes are actually improving.
          <br />
          <br />
          <strong>3. </strong>Often times an erosion is preceeded by a few days
          where my eyes felt particularly irritated. This is great and can give
          me a heads up that an erosion is on the way, however I tend to be
          forgetful and might not remember that my eyes were feeling bad on
          monday, when I get my erosion on friday.
        </div>
        <div className='info-subtitle'>Solution</div>
        <div className='info-text'>
          Design an application that allows me to track EVERYTHING. Track my eye
          drops, my medications, erosions, and even how my eyes were feeling
          that day. If I could just track all of this data then all my problems
          would be solved, and thus the Eye Tracker was born.
        </div>
        <div className='info-title'>How to Use</div>
        <div className='info-text'>
          The Eye Tracker is designed to be used in a similar way as one would
          use google calendar. Except instead of different events, the things
          being tracked and recorded are the different medications, conditions,
          and notes concerning your eyes.
          <br />
          <br />
          Simply navigate to the 'Add Item' page in order to add any piece of
          information you'd like to track.
          <br />
          <br />
          If you wish to edit that information, you only need to click that item
          on the calendar and you'll be navigated to the 'Edit Item' page. Here
          you can make any changes to the item that you might need to or even
          delete the item if need be.
        </div>
      </div>
    </div>
  );
};

export default InfoSubPage;
