import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/recipe/:id"
            element={<DetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
