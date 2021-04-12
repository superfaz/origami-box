import BaseStepBlockText, {
  useStepBlockTextState,
} from "../BaseTemplate/BaseStepBlockText";
import BaggiTemplateRecto from "./BaggiTemplateRecto";
import BaggiTemplateVerso from "./BaggiTemplateVerso";

export default function StepBlockText() {
  const [state, setState] = useStepBlockTextState();

  return (
    <BaseStepBlockText state={state} onStateChange={setState}>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateRecto text={state} />
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateVerso text={state} />
        </div>
      </div>
    </BaseStepBlockText>
  );
}
