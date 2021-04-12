import { Route, Switch, useRouteMatch } from "react-router";
import StepDebug from "../BaseTemplate/StepDebug";
import Error404 from "../Error/Error404";
import StepBlock from "./StepBlock";
import StepBlockImage from "./StepBlockImage";
import StepBlockText from "./StepBlockText";
import StepGenerate from "./StepGenerate";
import StepPrepare from "./StepPrepare";

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
      <Route exact path={`${path}/:block`}>
        <StepBlock />
      </Route>
      <Route exact path={[`${path}/:block/text`, `${path}/:block/text/:key`]}>
        <StepBlockText />
      </Route>
      <Route exact path={[`${path}/:block/image`, `${path}/:block/image/:key`]}>
        <StepBlockImage />
      </Route>
      <Route
        render={() => {
          throw new Error404();
        }}
      />
    </Switch>
  );
}
