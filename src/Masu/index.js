import React from 'react';
import { withTranslation } from 'react-i18next';
import FormGeneral from './FormGeneral';
import FormDetail from './FormDetail';
import { connect } from 'react-redux';
import { getMasu } from '../store';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GeneratePDF from './FormGenerate';

class Masu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (
      <div className="container mt-2">
        <h1>{t('masu.title')}</h1>
        <Switch>
        <Route exact path="/">
            <FormGeneral />
          </Route>
          <Route exact path="/back">
            <FormDetail title={t('masu.box.title')} block={this.props.box} />
          </Route>
          {/* <Route path="/lid">
                <FormDetail title={t('masu.lid.title')} block={this.props.lid} />
              </Route> */}
          <Route exact path="/generate">
            <GeneratePDF />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withTranslation()(connect(state => getMasu(state))(Masu));
