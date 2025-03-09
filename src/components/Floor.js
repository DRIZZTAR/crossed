import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Floor = props => {
	const [ref] = usePlane(index => ({ type: 'Static', mass: 0, ...props }));
	const alphaMap = useLoader(TextureLoader, '/gridSquare.jpg');

	return (
		<mesh receiveShadow rotation={props.rotation} ref={ref}>
			<planeGeometry args={[48,48]}/>
			<MeshReflectorMaterial
				alphaMap={alphaMap}
				transparent={true}
				color={[0.5, 0.5, 0.5]}
				envMapIntensity={0.35}
				metalness={0.3}
				roughness={0.2}
				dithering={true}
				blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
				mixBlur={0.3} // How much blur mixes with surface roughness (default = 1)
				mixStrength={4} // Strength of the reflections
				mixContrast={1} // Contrast of the reflections
				resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
				mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
				depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
				minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
				maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
				depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
				debug={0}
				reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
			/>
		</mesh>
	);
};

export default Floor;
