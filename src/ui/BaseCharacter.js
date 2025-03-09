import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState, useCallback } from 'react';
import { usePlayerControls } from '../utils/helpers.js';
import * as THREE from 'three';
import Crossbow from '../components/Crossbow';
import Arrow from '../components/Arrow';

const BaseCharacter = props => {
	const direction = new THREE.Vector3();
	const frontVector = new THREE.Vector3();
	const sideVector = new THREE.Vector3();
	const speed = new THREE.Vector3();
	const SPEED = 5;

	const { camera } = useThree();
	const crossbowRef = useRef();

	// State to track arrows
	const [arrows, setArrows] = useState([]);

	// State for crossbow kickback animation
	const [kickback, setKickback] = useState({ active: false, time: 0 });

	const [ref, api] = useSphere(index => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 10, 0],
		...props,
	}));

	const { forward, backward, left, right, jump } = usePlayerControls();
	const velocity = useRef([0, 0, 0]);
	useEffect(() => api.velocity.subscribe(v => (velocity.current = v)), [api.velocity]);

	// Function to shoot an arrow
	const shootArrow = useCallback(() => {
		if (!crossbowRef.current) return;

		// Get the camera's direction vector
		const arrowDirection = new THREE.Vector3();
		camera.getWorldDirection(arrowDirection);

		// Get the crossbow's position for arrow spawn
		const crossbowPosition = new THREE.Vector3();
		crossbowRef.current.getWorldPosition(crossbowPosition);

		// Adjust position slightly to match the tip of the crossbow
		// Create a vector pointing forward from the crossbow
		const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(crossbowRef.current.quaternion);
		// Move the spawn point to the tip of the crossbow
		crossbowPosition.add(forward.multiplyScalar(0.5));

		// Create a new arrow with a unique ID
		const newArrow = {
			id: Date.now(),
			position: crossbowPosition,
			direction: arrowDirection,
		};

		// Add the new arrow to the arrows array
		setArrows(prevArrows => [...prevArrows, newArrow]);

		// Trigger kickback animation
		setKickback({ active: true, time: 0 });
	}, [camera, crossbowRef, setArrows]);

	// Modify the onHit handler to include collision information
	const handleArrowHit = (arrowId, collisionEvent) => {
		// You can do something with the collision event here
		// For example, check what the arrow hit and apply damage
		if (collisionEvent) {
			console.log(`Arrow ${arrowId} hit:`, collisionEvent.body);
			// You could check what was hit and apply game logic
			// e.g., if (collisionEvent.body.name === 'enemy') applyDamage();
		}

		// Remove the arrow
		removeArrow(arrowId);
	};

	// Add click event listener
	useEffect(() => {
		const handleClick = () => {
			shootArrow();
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [shootArrow]);

	// Function to remove an arrow
	const removeArrow = arrowId => {
		setArrows(prevArrows => prevArrows.filter(arrow => arrow.id !== arrowId));
	};

	useFrame((state, delta) => {
		ref.current.getWorldPosition(camera.position);
		frontVector.set(0, 0, Number(backward) - Number(forward));
		sideVector.set(Number(left) - Number(right), 0, 0);
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED)
			.applyEuler(camera.rotation);
		speed.fromArray(velocity.current);

		api.velocity.set(direction.x, velocity.current[1], direction.z);
		if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
			api.velocity.set(velocity.current[0], 5, velocity.current[2]);

		if (crossbowRef.current) {
			// Position the crossbow
			crossbowRef.current.position.set(
				camera.position.x,
				camera.position.y - 0.2,
				camera.position.z
			);
			crossbowRef.current.rotation.copy(camera.rotation);
			crossbowRef.current.translateZ(-0.7);
			crossbowRef.current.translateX(0.2);

			// Apply kickback animation if active
			if (kickback.active) {
				// Update kickback time
				const newTime = kickback.time + delta * 10; // Control animation speed

				// Apply kickback movement
				if (newTime < 0.15) {
					// Initial backward movement (quick)
					crossbowRef.current.translateZ(0.05);
				} else if (newTime < 0.5) {
					// Return to original position (slower)
					crossbowRef.current.translateZ(-0.02);
				} else {
					// Reset kickback when animation is complete
					setKickback({ active: false, time: 0 });
				}

				// Update kickback time
				setKickback(prev => ({ ...prev, time: newTime }));
			}
		}
	});

	return (
		<group>
			<mesh castShadow position={props.position} ref={ref}>
				<sphereGeometry args={props.args} />
				<meshStandardMaterial color='#FFFF00' />
			</mesh>

			<Crossbow ref={crossbowRef} scale={0.25} />

			{/* Render all active arrows */}
			{arrows.map(arrow => (
				<Arrow
					key={arrow.id}
					position={arrow.position}
					direction={arrow.direction}
					onHit={collisionEvent => handleArrowHit(arrow.id, collisionEvent)}
					scale={0.25}
				/>
			))}
		</group>
	);
};

export default BaseCharacter;
