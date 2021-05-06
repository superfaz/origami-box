import BaseStepGenerate from "../BaseTemplate/BaseStepGenerate";
import { useTemplate } from "../hooks";
import MasuTemplateRecto from "./MasuTemplateRecto";
import MasuTemplateVerso from "./MasuTemplateVerso";

export default function StepGenerate() {
  const { data: masu } = useTemplate();

  return (
    <BaseStepGenerate>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <MasuTemplateRecto print="true" />
        </div>
        {masu.withDesign && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateVerso print="true" />
          </div>
        )}
        {masu.withLid && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateRecto lid print="true" />
          </div>
        )}
        {masu.withLid && masu.withDesign && (
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateVerso lid print="true" />
          </div>
        )}
      </div>
    </BaseStepGenerate>
  );
}
