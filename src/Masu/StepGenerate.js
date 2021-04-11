import BaseStepGenerate from "../BaseTemplate/BaseStepGenerate";
import { useTemplate } from "../hooks";
import MasuTemplateFront from "./MasuTemplateFront";
import MasuTemplateBack from "./MasuTemplateBack";

export default function StepGenerate() {
  const { data: masu } = useTemplate();

  return (
    <BaseStepGenerate>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <MasuTemplateFront print="true" />
        </div>
        {masu.withDesign && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateBack print="true" />
          </div>
        )}
        {masu.withLid && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateFront lid print="true" />
          </div>
        )}
        {masu.withLid && masu.withDesign && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateBack lid print="true" />
          </div>
        )}
      </div>
    </BaseStepGenerate>
  );
}
