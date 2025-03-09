import { Sky, Environment } from "@react-three/drei";

const Lights = () => {
  return (
		<>
			{/* <Sky
				distance={450000}
				sunPosition={[2, 4, 0]}
				inclination={1}
				azimuth={0.25}
				rayleigh={0.2}
				turbidity={0.9}
			/> */}
			<Environment background={'both'} files={'envmap.hdr'} />
			<ambientLight intensity={1.5} />
			<directionalLight position={[5, 10, 1]} intensity={2} />
		</>
  );
};

export default Lights;
