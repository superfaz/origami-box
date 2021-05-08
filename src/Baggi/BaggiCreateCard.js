import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import BaseCreateCard from "../BaseTemplate/BaseCreateCard";

const colorRecto = "#FCB900";
const colorVerso = "#ff3300";

function Side({ color, ...rest }) {
  return (
    <group {...rest}>
      <mesh>
        <planeBufferGeometry args={[2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function SideRecto(props) {
  return Side({ color: colorRecto, ...props });
}

function SideVerso(props) {
  return Side({ color: colorVerso, ...props });
}

function TriangleGeometry({ x1, y1, x2, y2, x3, y3 }) {
  const positions = [
    [x1, y1, 0],
    [x2, y2, 0],
    [x3, y3, 0],
    [x1, y1, 0],
  ].flat();

  const normals = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ].flat();

  return (
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
  );
}

function BigTriangle({ color, doubleSide = false, ...rest }) {
  return (
    <group {...rest}>
      <mesh>
        <TriangleGeometry
          x1={-0.5}
          y1={0.5}
          x2={0.5}
          y2={-0.5}
          x3={-0.5}
          y3={-0.5}
        />
        {doubleSide && (
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        )}
        {!doubleSide && <meshStandardMaterial color={color} />}
      </mesh>
    </group>
  );
}

function BigTriangleRecto(props) {
  return BigTriangle({ color: colorRecto, ...props });
}

function BigTriangleVerso(props) {
  return BigTriangle({ color: colorVerso, ...props });
}

function BaggiBox(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group {...props} ref={mesh}>
      <SideRecto position={[0, 0, 0.5]} />
      <SideVerso position={[0, 0, 0.5]} rotation={[0, Math.PI, 0]} />
      <BigTriangleVerso
        position={[1, 0, 0]}
        rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        doubleSide
      />
      <BigTriangleVerso position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <BigTriangleRecto
        position={[1, 0, 0]}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
      />
      <BigTriangleVerso
        position={[-1, 0, 0]}
        rotation={[0, -Math.PI / 2, -Math.PI / 2]}
        doubleSide
      />
      <BigTriangleVerso
        position={[-1, 0, 0]}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
      />
      <BigTriangleRecto position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <SideVerso position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <SideVerso position={[0, 0, -0.5]} />
      <SideVerso position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

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
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, 10, 10]} />
        <BaggiBox
          position={[0, 0, -1]}
          scale={[2, 2, 2]}
          rotation={[0.7, 0, 0]}
        />
      </Canvas>
    </BaseCreateCard>
  );
}
