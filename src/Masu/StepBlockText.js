import { useParams } from "react-router-dom";
import BaseStepBlockText, {
  useStepBlockTextState,
} from "../BaseTemplate/BaseStepBlockText";
import MasuTemplateVerso from "./MasuTemplateVerso";

export default function StepBlockText() {
  const { block } = useParams();
  const [state, setState] = useStepBlockTextState();

  return (
    <BaseStepBlockText state={state} onStateChange={setState}>
      <MasuTemplateVerso lid={block === "lid"} text={state} />
    </BaseStepBlockText>
  );
}
