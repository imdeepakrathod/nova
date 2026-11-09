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

      <mesh position={[0.42, -0.2, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.08, 0.82, 0.58]} />
        {panelMaterial()}
      </mesh>

      <mesh position={[-0.42, -0.2, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.08, 0.82, 0.58]} />
        {panelMaterial()}
      </mesh>

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
