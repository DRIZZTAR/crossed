import { useBox } from '@react-three/cannon';


const BaseBox = ({ texture, ...props }) => {
	const [ref] = useBox(index => ({
		type: 'Static',
		mass: 1,
		onCollide: e => {
			console.log(e);
		},
		...props,
	}));

	// Create material based on whether a texture is provided
	const material = texture ? (
		<meshStandardMaterial map={texture} />
	) : (
		<meshStandardMaterial color={props.color} />
	);

	return (
		<mesh castShadow position={props.position} ref={ref}>
			<boxGeometry args={props.args} />
			{material}
		</mesh>
	);
};

export default BaseBox;
