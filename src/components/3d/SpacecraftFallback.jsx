function SpacecraftFallback() {
  const panelMaterial = () => (
    <meshStandardMaterial
      color="#263C58"
      emissive="#0B1E35"
      emissiveIntensity={0.28}
      metalness={0.36}
      roughness={0.3}
    />
  );

  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.3, 2.1, 32]} />
        <meshStandardMaterial color="#D8DFEA" metalness={0.62} roughness={0.32} />
      </mesh>

      <mesh castShadow position={[0, 1.18, 0]}>
        <coneGeometry args={[0.3, 0.55, 32]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.42} roughness={0.26} />
      </mesh>

      <mesh position={[0, -1.13, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.24, 0.36, 32, 1, true]} />
        <meshStandardMaterial
          color="#232A35"
          emissive="#FF4D00"
          emissiveIntensity={0.42}
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 24]} />
        <meshBasicMaterial color="#FFB38A" toneMapped={false} />
      </mesh>
      {[-0.105, 0, 0.105].map((x) => (
        <mesh key={x} position={[x, -1.14, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.07, 0.28, 20, 1, true]} />
          <meshStandardMaterial
            color="#252D39"
            emissive="#FF6A32"
            emissiveIntensity={0.24}
            metalness={0.58}
            roughness={0.32}
          />
        </mesh>
      ))}

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.44, -0.12, 0]} rotation={[0, 0, side * 0.12]}>
          <mesh>
            <boxGeometry args={[0.06, 1.22, 0.68]} />
            {panelMaterial()}
          </mesh>
          {[-0.38, 0, 0.38].map((y) => (
            <mesh key={y} position={[side * 0.035, y, 0]}>
              <boxGeometry args={[0.012, 0.012, 0.64]} />
              <meshBasicMaterial color="#7EA7C9" toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.26, 0.2]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color="#1E8BFF"
          emissive="#0B4B91"
          emissiveIntensity={0.36}
          metalness={0.15}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, -0.35, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.025, 12, 32]} />
        <meshStandardMaterial color="#707B8B" metalness={0.72} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0.58, 0.04]}>
        <boxGeometry args={[0.2, 0.16, 0.22]} />
        <meshStandardMaterial color="#303946" metalness={0.58} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default SpacecraftFallback;
