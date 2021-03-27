import { Switch, Route, useRouteMatch } from "react-router-dom";
import StepAGeneral from "./StepAGeneral";
import StepBDesign from "./StepBDesign";
import StepCText from "./StepCText";
import StepDImage from "./StepDImage";
import StepYDebug from "./StepYDebug";
import StepZGenerate from "./StepZGenerate";

export default function Masu() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StepAGeneral />
      </Route>
      <Route exact path={`${path}/base`}>
        <StepBDesign />
      </Route>
      <Route exact path={[`${path}/base/text`, `${path}/base/text/:key`]}>
        <StepCText />
      </Route>
      <Route exact path={[`${path}/base/image`, `${path}/base/image/:key`]}>
        <StepDImage />
      </Route>
      <Route exact path={`${path}/lid`}>
        <StepBDesign lid />
      </Route>
      <Route exact path={[`${path}/lid/text`, `${path}/lid/text/:key`]}>
        <StepCText lid />
      </Route>
      <Route exact path={[`${path}/lid/image`, `${path}/lid/image/:key`]}>
        <StepDImage lid />
      </Route>
      <Route exact path={`${path}/debug`}>
        <StepYDebug />
      </Route>
      <Route exact path={`${path}/generate`}>
        <StepZGenerate />
      </Route>
    </Switch>
  );
}
