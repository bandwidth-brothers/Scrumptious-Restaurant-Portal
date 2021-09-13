import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={["/","/login"]}>
            <Login />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
