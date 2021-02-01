import React from 'react';
import { withTranslation } from 'react-i18next';
import StepAGeneral from './StepAGeneral';
import StepBBoxDesign from './StepBBoxDesign';
import StepZGenerate from './StepZGenerate';
import { connect } from 'react-redux';
import { getMasu } from '../store';
import { Switch, Route } from 'react-router-dom';

class Masu extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="container mt-2">
        <h1>{t('masu.title')}</h1>
        <Switch>
          <Route exact path="/">
            <StepAGeneral />
          </Route>
          <Route exact path="/back">
            <StepBBoxDesign title={t('masu.stepBBoxDesign.title')} block={this.props.box} />
          </Route>
          {/* <Route path="/lid">
                <FormDetail title={t('masu.lid.title')} block={this.props.lid} />
              </Route> */}
          <Route exact path="/generate">
            <StepZGenerate />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withTranslation()(connect(state => getMasu(state))(Masu));
