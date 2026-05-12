import Feed from "./components/Feed";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
function App()
{
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body></Body>}>
              <Route path='/' element={<Feed></Feed>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/signup' element={<Signup></Signup>}></Route>
              <Route path='/profile' element={<Profile></Profile>}></Route>
              <Route path='/connections' element={<Connections></Connections>}></Route>
              <Route path='/request' element={<Requests></Requests>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
