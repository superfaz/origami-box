import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
      </LeftForm>
      <RightPreview>
        {masu.withBackDesign &&
          <MasuTemplateBack detail={masu.lid} />
        }
        {!masu.withBackDesign &&
          <MasuTemplateFront lid />
        }
      </RightPreview>
    </div>
  );
}
