import classNames from "classnames";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

function BoxMaterial() {
  return <meshStandardMaterial color="#FCB900" side={THREE.DoubleSide} />;
}

function BottomTriangle(props) {
  const positions = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ].flat();

  const normals = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ].flat();

  return (
    <group {...props}>
      <mesh rotation={[-0.2, 0, 0]}>
        <bufferGeometry>
          <float32BufferAttribute
            attachObject={["attributes", "position"]}
            args={[positions, 3]}
          />
          <float32BufferAttribute
            attachObject={["attributes", "normal"]}
            args={[normals, 3]}
          />
        </bufferGeometry>
        <BoxMaterial />
      </mesh>
    </group>
  );
}

function Side(props) {
  return (
    <group {...props}>
      <mesh>
        <planeBufferGeometry args={[2, 1]} />
        <BoxMaterial />
      </mesh>
    </group>
  );
}

function MasuBox(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group {...props} ref={mesh}>
      <group name="bottom" position={[0, -0.5, 0]}>
        <BottomTriangle position={[0, 0, -1]} rotation={[0, 0, 0]} />
        <BottomTriangle position={[0, 0, 1]} rotation={[0, Math.PI, 0]} />
        <BottomTriangle position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <BottomTriangle position={[1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </group>
      <Side position={[0, 0, 1]} />
      <Side position={[0, 0, -1]} rotation={[0, Math.PI, 0]} />
      <Side position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Side position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

export default function MasuCreateCard({
  className,
  onCreate = () => {},
  ...rest
}) {
  const { t } = useTranslation();
  return (
    <div className={classNames("card", className)} {...rest}>
      <div className="row g-0">
        <div className="col-4">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <pointLight position={[-10, 10, 10]} />
            <MasuBox
              position={[0, 0, -1]}
              scale={[2, 2, 2]}
              rotation={[0.7, 0, 0]}
            />
          </Canvas>
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{t("create.masu.title")}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {t("create.masu.subtitle")}
            </h6>
            <p className="card-text">{t("create.masu.description")}</p>
            <button
              onClick={onCreate}
              className="btn btn-primary stretched-link"
            >
              {t("create.masu.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
