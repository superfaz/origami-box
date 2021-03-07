import { useTranslation } from 'react-i18next';
import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { isGeneralValid } from './helper';
import './Nav.css';
import { useTemplate } from '../hooks';

function BreadcrumbItem({ exact = false, path, title, withLink }) {
  const paths = Array.isArray(path) ? path : [path];
  const location = useLocation();
  const currentPath = location.pathname;

  const active = exact ? paths.includes(currentPath) : paths.some(p => currentPath.startsWith(p));
  return (
    <li className={classNames(
      "breadcrumb-item d-flex align-bottom",
      { "h4 active": active },
      { "mt-1": !active }
    )}>
      {withLink && !active &&
        <Link to={paths[0]}>{title}</Link>
      }
      {!(withLink && !active) &&
        title
      }
    </li>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const { template, data: masu } = useTemplate();
  const path = '/edit/' + template.key;

  return (
    <nav className="nav-steps" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadcrumbItem exact path="/masu" title={t('masu.stepAGeneral.title')} withLink={isGeneralValid(masu)} />
        {!masu.withLid && masu.withDesign &&
          <BreadcrumbItem path="/masu/base" title={t('masu.stepBDesign.box.title')} withLink={isGeneralValid(masu)} />
        }
        {masu.withLid && masu.withDesign &&
          <BreadcrumbItem path="/masu/base" title={t('masu.stepBDesign.base.title')} withLink={isGeneralValid(masu)} />
        }
        {masu.withLid && masu.withDesign &&
          <BreadcrumbItem path="/masu/lid" title={t('masu.stepBDesign.lid.title')} withLink={isGeneralValid(masu)} />
        }
        {process.env.NODE_ENV === 'development' &&
          <BreadcrumbItem path={`${path}/debug`} title={t('masu.stepYDebug.title')} withLink={true} />
        }
      </ol>
    </nav>
  );
}
