export default function SvgImage({ face, image }) {
  if (image.content === null) {
    // Image file not provided
    return null;
  }

  let width = image.size === "auto" ? null : parseFloat(image.width);
  let height = image.size === "auto" ? null : parseFloat(image.height);
  let x = face.x;
  let y = face.y;

  if (image.size === "auto") {
    if (face.width >= face.height) {
      height = 2 * (face.vert - image.marginVertical);
      width = (image.originalWidth * height) / image.originalHeight;
    } else {
      width = 2 * (face.hori - image.marginHorizontal);
      height = (image.originalHeight * width) / image.originalWidth;
    }
  }

  if (width === null || height === null || isNaN(width) || isNaN(height)) {
    // Manual size not provided
    return null;
  }

  switch (image.horizontal) {
    case "left":
      x -= face.hori - image.marginHorizontal;
      break;
    case "center":
      x -= width / 2;
      break;
    case "right":
      x += face.hori - width - image.marginHorizontal;
      break;
    default:
      throw new Error(
        `The horizontal value '${image.horizontal}' is not managed`
      );
  }

  switch (image.vertical) {
    case "top":
      y -= face.vert - image.marginVertical;
      break;
    case "middle":
      y -= height / 2;
      break;
    case "bottom":
      y += face.vert - height - image.marginVertical;
      break;
    default:
      throw new Error(`The vertical value '${image.vertical}' is not managed`);
  }

  return (
    <image href={image.content} x={x} y={y} width={width} height={height} />
  );
}
