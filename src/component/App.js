import React from "react";

import "../App.css";
import config from "../config";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function App() {
  config();

  return (
    <div>
      <Header />
      <Page />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default React.memo(App);

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
