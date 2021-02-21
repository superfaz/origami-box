import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StepAGeneral from './StepAGeneral';
import StepBBoxDesign from './StepBBoxDesign';
import StepCText from './StepCText';
import StepDImage from './StepDImage';
import StepZGenerate from './StepZGenerate';

export default function Masu() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>{t('masu.title')}</h1>
      <Switch>
        <Route exact path="/">
          <StepAGeneral />
        </Route>
        <Route exact path="/base">
          <StepBBoxDesign />
        </Route>
        <Route exact path="/base/text">
          <StepCText />
        </Route>
        <Route exact path="/base/image">
          <StepDImage />
        </Route>
        <Route exact path="/lid">
          <StepBBoxDesign lid />
        </Route>
        <Route exact path="/lid/text">
          <StepCText lid />
        </Route>
        <Route exact path="/lid/image">
          <StepDImage lid />
        </Route>
        <Route exact path="/generate">
          <StepZGenerate />
        </Route>
      </Switch>
    </div>
  );
}
