import { Switch, Route, useRouteMatch } from "react-router-dom";
import Nav from "./Nav";
import StepPrepare from "./StepPrepare";
import StepBlock from "./StepBlock";
import StepBlockText from "./StepBlockText";
import StepBlockImage from "./StepBlockImage";
import StepDebug from "./StepDebug";
import StepGenerate from "./StepGenerate";

export default function MasuEditPage() {
  const { path } = useRouteMatch();

  return (
    <div className="row">
      <Nav />
      <Switch>
        <Route exact path={path}>
          <StepPrepare />
        </Route>
        <Route exact path={`${path}/base`}>
          <StepBlock />
        </Route>
        <Route exact path={[`${path}/base/text`, `${path}/base/text/:key`]}>
          <StepBlockText />
        </Route>
        <Route exact path={[`${path}/base/image`, `${path}/base/image/:key`]}>
          <StepBlockImage />
        </Route>
        <Route exact path={`${path}/lid`}>
          <StepBlock lid />
        </Route>
        <Route exact path={[`${path}/lid/text`, `${path}/lid/text/:key`]}>
          <StepBlockText lid />
        </Route>
        <Route exact path={[`${path}/lid/image`, `${path}/lid/image/:key`]}>
          <StepBlockImage lid />
        </Route>
        <Route exact path={`${path}/debug`}>
          <StepDebug />
        </Route>
        <Route exact path={`${path}/generate`}>
          <StepGenerate />
        </Route>
      </Switch>
    </div>
  );
}
