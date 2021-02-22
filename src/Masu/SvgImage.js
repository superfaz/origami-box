import { useSelector } from "react-redux";
import { getMasu } from "../store";
import { configureFace, useMasuMeasurement } from "./helper";

export default function SvgImage({ image, lid = false}) {
  const masu = useSelector(getMasu);
  const m = useMasuMeasurement(masu, lid);
  if (image.content === null) {
    // Image file not provided
    return null;
  }

  const face = configureFace(image, m.l_2, m.w_2, m.h_2);
  let width = image.size === 'auto' ? null : parseFloat(image.width);
  let height = image.size === 'auto' ? null : parseFloat(image.height);
  let x = face.x;
  let y = face.y;

  if (image.size === 'auto') {
    if (face.width >= face.height) {
      height = face.height - 2 * image.marginVertical;
      width = image.originalWidth * height / image.originalHeight;
    }
    else {
      width = face.width - 2 * image.marginHorizontal;
      height = image.originalHeight * width / image.originalWidth;
    }
  }

  if (width === null || height === null || isNaN(width) || isNaN(height)) {
    // Manual size not provided
    return null;
  }

  switch (image.horizontal) {
    case 'left':
      x -= face.hori - image.marginHorizontal;
      break;
    case 'center':
      x -= width / 2;
      break;
    case 'right':
      x += face.hori - width - image.marginHorizontal;
      break;
  }

  switch (image.vertical) {
    case 'top':
      y -= face.vert - image.marginVertical;
      break;
    case 'middle':
      y -= height / 2;
      break;
    case 'bottom':
      y += face.vert - height - image.marginVertical;
      break;
  }

  return (
    <image href={image.content} x={x} y={y} width={width} height={height} />
  );
}
