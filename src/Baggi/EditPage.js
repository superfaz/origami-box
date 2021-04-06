import { Route, Switch, useRouteMatch } from "react-router";
import StepPrepare from "./StepPrepare";

export default function BaggiEditPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StepPrepare />
      </Route>
    </Switch>
  );
}
