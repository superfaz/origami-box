import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { getMasu } from '../store';
import { isGeneralValid } from './helper';
import './Nav.css';

function BreadcrumbItem({ path, title, withLink }) {
  const paths = Array.isArray(path) ? path : [path];
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <li className={classNames(
      "breadcrumb-item d-flex align-bottom",
      { "h4 active": paths.includes(currentPath) },
      { "mt-1": !paths.includes(currentPath) }
    )}>
      {withLink && !paths.includes(currentPath) &&
        <Link to={paths[0]}>{title}</Link>
      }
      {!(withLink && !paths.includes(currentPath)) && title}
    </li>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  return (
    <nav className="nav-steps" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadcrumbItem path="/" title={t('masu.stepAGeneral.title')} withLink={isGeneralValid(masu)} />
        {masu.withBackDesign &&
          <BreadcrumbItem path={["/back", "/back/text", "/back/image"]} title={t('masu.stepBBoxDesign.title')} withLink={isGeneralValid(masu)} />
        }
        {masu.withLid && masu.withBackDesign &&
          <BreadcrumbItem path="/lid" title={t('masu.stepELidDesign.title')} withLink={isGeneralValid(masu)} />
        }
        <BreadcrumbItem path="/generate" title={t('masu.stepZGenerate.title')} withLink={isGeneralValid(masu)} />
      </ol>
    </nav>
  );
}
