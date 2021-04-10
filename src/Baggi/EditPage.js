import { Route, Switch, useRouteMatch } from "react-router";
import Error404 from "../Error/Error404";
import StepPrepare from "./StepPrepare";

export default function BaggiEditPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StepPrepare />
      </Route>
      <Route
        render={() => {
          throw new Error404();
        }}
      />
    </Switch>
  );
}
