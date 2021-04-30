import React, { useState, useEffect, useReducer } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import config from "./config";
import { authReducer, initialState } from "./modules/reducers";
import Sidebar from "./Sidebar";

export const AuthDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  config();
  console.log(process.env.JWT_SECRET);
  return (
    <div>
      <AuthDispatch.Provider value={dispatch}>
        <h1>this is main</h1>
        <Sidebar state={state} />
      </AuthDispatch.Provider>
    </div>
  );
}

export default App;

{
  /* <Router>
<AuthDispatch>
   <Headers>
     <Menu/>
   </Headers>

   <Content />

   <Sidebar>
     <Login> <Auth/> </Login> : <DashBoard/>
   </Sidebar>

   <Footer/>
 </AuthDispatch>
</Router> */
}
