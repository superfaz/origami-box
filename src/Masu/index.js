import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMasu } from '../store';
import StepAGeneral from './StepAGeneral';
import StepBBoxDesign from './StepBBoxDesign';
import StepCText from './StepCText';
import StepDImage from './StepDImage';
import StepELidDesign from './StepELidDesign';
import StepZGenerate from './StepZGenerate';

export default function Masu() {
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  return (
    <div className="container">
      <h1>{t('masu.title')}</h1>
      <Switch>
        <Route exact path="/">
          <StepAGeneral />
        </Route>
        <Route exact path="/base">
          <StepBBoxDesign title={t('masu.stepBBoxDesign.title')} block={masu.box} />
        </Route>
        <Route exact path="/base/text">
          <StepCText />
        </Route>
        <Route exact path="/base/image">
          <StepDImage />
        </Route>
        <Route exact path="/lid">
          <StepELidDesign />
        </Route>
        <Route exact path="/generate">
          <StepZGenerate />
        </Route>
      </Switch>
    </div>
  );
}
