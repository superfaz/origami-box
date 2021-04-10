import { useParams } from "react-router-dom";
import BaseStepBlockText, {
  useStepBlockTextState,
} from "../BaseTemplate/BaseStepBlockText";
import MasuTemplateBack from "./MasuTemplateBack";

export default function StepBlockText() {
  const { block } = useParams();
  const [state, setState] = useStepBlockTextState();

  return (
    <BaseStepBlockText state={state} onStateChange={setState}>
      <MasuTemplateBack lid={block === "lid"} text={state} />
    </BaseStepBlockText>
  );
}
