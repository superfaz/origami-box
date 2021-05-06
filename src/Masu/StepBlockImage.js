import { useParams } from "react-router-dom";
import BaseStepBlockImage, {
  useStepBlockImageState,
} from "../BaseTemplate/BaseStepBlockImage";
import MasuTemplateVerso from "./MasuTemplateVerso";

export default function StepBlockImage() {
  const { block } = useParams();
  const [state, setState] = useStepBlockImageState();

  return (
    <BaseStepBlockImage state={state} onStateChange={setState}>
      <MasuTemplateVerso lid={block === "lid"} image={state} />
    </BaseStepBlockImage>
  );
}
