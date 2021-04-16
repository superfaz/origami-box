import objectMap from "../objectMap";
import SvgImage from "./SvgImage";
import SvgText from "./SvgText";

export default function SvgFacesContent({
  ids,
  faces,
  side,
  inverted = false,
  images = [],
  texts = [],
}) {
  return objectMap(faces, (face, key) => {
    const rotate = inverted && key !== "0" ? 180 + face.rotate : face.rotate;
    if (face.side !== side) {
      return null;
    } else {
      return (
        <g key={key} clipPath={"url(#" + ids.unique(`face-${key}`) + ")"}>
          <g transform={`rotate(${rotate} ${face.x} ${face.y})`}>
            {images
              .filter((image) => image.face === key)
              .map((image) => (
                <SvgImage
                  key={key + "-" + image.key}
                  face={face}
                  image={image}
                />
              ))}
            {texts
              .filter((text) => text.face === key)
              .map((text) => (
                <SvgText key={key + "-" + text.key} face={face} text={text} />
              ))}
          </g>
        </g>
      );
    }
  });
}
