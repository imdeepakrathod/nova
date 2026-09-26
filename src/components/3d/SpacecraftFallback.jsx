function SpacecraftFallback() {
  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.18, 0.3, 2.1, 32]} />
        <meshStandardMaterial color="#D8DFEA" metalness={0.62} roughness={0.32} />
      </mesh>

      <mesh position={[0, 1.18, 0]}>
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

      <mesh position={[0.42, -0.2, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.08, 0.82, 0.58]} />
        <meshStandardMaterial color="#8F9AAD" metalness={0.52} roughness={0.36} />
      </mesh>

      <mesh position={[-0.42, -0.2, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.08, 0.82, 0.58]} />
        <meshStandardMaterial color="#8F9AAD" metalness={0.52} roughness={0.36} />
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
    </group>
  );
}

export default SpacecraftFallback;
