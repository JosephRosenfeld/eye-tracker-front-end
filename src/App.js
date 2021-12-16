import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' component={Weekly} />
          <Route path='/3day' component={ThreeDay} />
          <Route path='/week' component={Weekly} />
          <Route path='/year' component={Yearly} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
