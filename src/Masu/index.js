import React from 'react';
import StepAGeneral from './StepAGeneral';
import StepBBoxDesign from './StepBBoxDesign';
import StepZGenerate from './StepZGenerate';
import StepCBoxText from './StepCBoxText';
import { useSelector } from 'react-redux';
import { getMasu } from '../store';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Masu() {
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  return (
    <div className="container mt-2">
      <h1>{t('masu.title')}</h1>
      <Switch>
        <Route exact path="/">
          <StepAGeneral />
        </Route>
        <Route exact path="/back">
          <StepBBoxDesign title={t('masu.stepBBoxDesign.title')} block={masu.box} />
        </Route>
        <Route exact path="/back/text/:id">
          <StepCBoxText />
        </Route>
        <Route exact path="/back/text">
          <StepCBoxText />
        </Route>
        {/* <Route path="/lid">
                <FormDetail title={t('masu.lid.title')} block={masu.lid} />
              </Route> */}
        <Route exact path="/generate">
          <StepZGenerate />
        </Route>
      </Switch>
    </div>
  );
}
