import { Route, Switch, useRouteMatch } from "react-router";
import StepDebug from "../BaseTemplate/StepDebug";
import Error404 from "../Error/Error404";
import StepPrepare from "./StepPrepare";
import StepGenerate from "./StepGenerate";

export default function BaggiEditPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StepPrepare />
      </Route>
      <Route exact path={`${path}/generate`}>
        <StepGenerate />
      </Route>
      <Route exact path={`${path}/debug`}>
        <StepDebug />
      </Route>
      <Route
        render={() => {
          throw new Error404();
        }}
      />
    </Switch>
  );
}
