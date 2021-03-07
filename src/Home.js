import { useState } from "react";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { MasuTemplate } from "./Masu/MasuTemplateBack";
import objectMap from "./objectMap";
import { getTemplates } from "./store";
import { create, remove } from "./store/templates";

export default function Home() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const templates = useSelector(getTemplates);
  const dispatch = useDispatch();

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect('/edit/' + key);
  }

  function handleDiscard(key) {
    dispatch(remove(key));
  }

  if (redirect !== null) {
    return (
      <Redirect to={redirect} />
    );
  }
  else {
    return (
      <div className="container">
        <h1 className="display-3">
          <Trans i18nKey="home.title">
            Welcome <i className='far fa-smile-wink'></i>
          </Trans>
        </h1>
        <div className="row">
          <div className="col-xl-8 col-lg-6 mb-3">
            <p className="lead mb-3">{t('home.description')}</p>
            <p>
              <button onClick={handleCreate} className="btn btn-lg btn-primary">{t('home.start')}</button>
            </p>
          </div>
          <div className="col-xl-4 col-lg-6 mb-3">
            <div className="card text-dark bg-warning mb-3">
              <div className="card-header">{t('home.beta.header')}</div>
              <div className="card-body">
                <h5 className="card-title">{t('home.beta.title')}</h5>
                <div className="card-text">
                  <Trans i18nKey="home.beta.text"></Trans>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(templates).length > 0 && (
            <>
              <h2>{t('home.localSave.title')}</h2>
              <p className="lead">{t('home.localSave.description')}</p>
              {objectMap(templates, (template, key) =>
                <div key={key} className="col-xl-3 col-lg-4 col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-img-top">
                      <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval={false}>
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <MasuTemplate masu={template.data} lid={true} withPaper={false} />
                          </div>
                          <div class="carousel-item">
                            <MasuTemplate masu={template.data} lid={false} withPaper={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{template.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{t('home.template.unsaved')}</h6>
                      <p className="card-text"></p>
                      <Link to={`/edit/${key}`} className="card-link">{t('home.template.continue')}</Link>
                      <button className="btn btn-link card-link"
                        onClick={() => handleDiscard(key)}>{t('home.template.discard')}</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
