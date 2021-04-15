import objectMap from "../objectMap";

export default function SvgClipPaths({ ids, faces, side }) {
  return (
    <>
      {objectMap(faces, (face, key) => {
        if (face.side !== side) {
          return null;
        } else {
          const x = face.x - face.width / 2.0;
          const y = face.y - face.height / 2.0;
          return (
            <clipPath key={key} id={ids.unique(`face-${key}`)}>
              <rect x={x} y={y} width={face.width} height={face.height} />
            </clipPath>
          );
        }
      })}
    </>
  );
}
