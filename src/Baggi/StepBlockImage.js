import BaseStepBlockImage, {
  useStepBlockImageState,
} from "../BaseTemplate/BaseStepBlockImage";
import BaggiTemplateRecto from "./BaggiTemplateRecto";
import BaggiTemplateVerso from "./BaggiTemplateVerso";

export default function StepBlockImage() {
  const [state, setState] = useStepBlockImageState();

  return (
    <BaseStepBlockImage state={state} onStateChange={setState}>
      <div className="row">
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateRecto image={state} />
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <BaggiTemplateVerso image={state} />
        </div>
      </div>
    </BaseStepBlockImage>
  );
}
