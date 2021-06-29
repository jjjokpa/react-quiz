import { Route, Switch } from "react-router-dom";

import TestStart from "./pages/TestStart";
import AllTests from "./pages/AllTests";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllTests />
        </Route>
        <Route path="/start" exact>
          <TestStart />
        </Route>
        <Route path="/new-test">
          <div>new Test</div>
        </Route>
        <Route path="/results">
          <div></div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
