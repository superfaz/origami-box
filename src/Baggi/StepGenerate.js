import BaseStepGenerate from "../BaseTemplate/BaseStepGenerate";
import BaggiTemplateFront from "./BaggiTemplateFront";

export default function StepGenerate() {
  return (
    <BaseStepGenerate>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateFront print="true" />
        </div>
      </div>
    </BaseStepGenerate>
  );
}
