import { Switch, Route, useRouteMatch } from "react-router-dom";
import Error404 from "../Error/Error404";
import StepPrepare from "./StepPrepare";
import StepBlock from "./StepBlock";
import StepBlockText from "./StepBlockText";
import StepBlockImage from "./StepBlockImage";
import StepDebug from "./StepDebug";
import StepGenerate from "./StepGenerate";

export default function MasuEditPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StepPrepare />
      </Route>
      <Route exact path={[`${path}/base`]}>
        <StepBlock />
      </Route>
      <Route exact path={[`${path}/:block/text`, `${path}/:block/text/:key`]}>
        <StepBlockText />
      </Route>
      <Route exact path={[`${path}/:block/image`, `${path}/:block/image/:key`]}>
        <StepBlockImage />
      </Route>
      <Route exact path={`${path}/lid`}>
        <StepBlock lid />
      </Route>
      <Route exact path={`${path}/debug`}>
        <StepDebug />
      </Route>
      <Route exact path={`${path}/generate`}>
        <StepGenerate />
      </Route>
      <Route
        render={() => {
          throw new Error404();
        }}
      />
    </Switch>
  );
}
