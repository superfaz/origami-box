import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BaseCreateCard from "../BaseTemplate/BaseCreateCard";

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
  return (
    <BaseCreateCard
      templateType="masu"
      className={className}
      onCreate={onCreate}
      {...rest}
    >
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
    </BaseCreateCard>
  );
}
