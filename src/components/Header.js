import "./Header.css";

const Header = () => {
  return (
    <header className='header'>
      <div className='title header-el'>Joseph's Eye Tracker</div>
      <div className='header-el'>
        {/*BAck button*/}
        December 16-22
        {/*Forward button*/}
      </div>
      <div className='icons header-el'>Icons</div>
    </header>
  );
};

export default Header;
