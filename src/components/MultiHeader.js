import "./MultiHeader.css";

const MultiHeader = ({ dtArr }) => {
  //calculate the scrollbar width

  return (
    <div className='multi-header'>
      <div className='time-scale-offset'></div>
      <div className='multi-header-days'>
        {dtArr.map((el) => (
          <div className='multi-header-day'>{el.day}</div>
        ))}
      </div>
      <div className='scroll-bar-offset'></div>
    </div>
  );
};

export default MultiHeader;
