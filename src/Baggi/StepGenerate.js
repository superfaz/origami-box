import BaseStepGenerate from "../BaseTemplate/BaseStepGenerate";
import BaggiTemplateRecto from "./BaggiTemplateRecto";
import BaggiTemplateVerso from "./BaggiTemplateVerso";

export default function StepGenerate() {
  return (
    <BaseStepGenerate>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateRecto print={true} />
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateVerso print={true} />
        </div>
      </div>
    </BaseStepGenerate>
  );
}
