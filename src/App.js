import { Route, Routes } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import Details from "./Details";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Content />}/>
        <Route path={`/content/:id`} element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
