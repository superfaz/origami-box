import BaseCreateCard from "../BaseTemplate/BaseCreateCard";

export default function BaggiCreateCard({
  className,
  onCreate = () => {},
  ...rest
}) {
  return (
    <BaseCreateCard
      templateType="baggi"
      className={className}
      onCreate={onCreate}
      {...rest}
    ></BaseCreateCard>
  );
}
