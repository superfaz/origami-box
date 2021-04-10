import { useParams } from "react-router-dom";
import BaseStepBlockImage, {
  useStepBlockImageState,
} from "../BaseTemplate/BaseStepBlockImage";
import MasuTemplateBack from "./MasuTemplateBack";

export default function StepBlockImage() {
  const { block } = useParams();
  const [state, setState] = useStepBlockImageState();

  return (
    <BaseStepBlockImage state={state} onStateChange={setState}>
      <MasuTemplateBack lid={block === "lid"} image={state} />
    </BaseStepBlockImage>
  );
}
