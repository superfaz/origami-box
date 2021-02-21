import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { getMasu } from "../store";
import { checkValidity } from "./helper";
import MasuTemplateFront from "./MasuTemplateFront";
import MasuTemplateBack from "./MasuTemplateBack";
import Nav from "./Nav";
import { updateDetail } from "./reducer";

export default function StepELidDesign() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateDetail('lid', event.target.name, value));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <div className="mb-3 mt-5 d-flex">
          <Link className="btn btn-primary ms-auto" to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
        </div>
      </LeftForm>
      <RightPreview>
        {masu.withDesign &&
          <MasuTemplateBack detail={masu.lid} />
        }
        {!masu.withDesign &&
          <MasuTemplateFront lid />
        }
      </RightPreview>
    </div>
  );
}
