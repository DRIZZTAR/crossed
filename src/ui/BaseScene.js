import { Canvas } from '@react-three/fiber';
import { Loader, PointerLockControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Lights from '../components/Lights.js';
import Floor from '../components/Floor.js';

const BasicScene = ({ children }) => {
	return (
		<div className='scene-container'>
			<Canvas shadows camera={{ fov: 50 }}>
				<Stats />
				<Lights />
				<Physics gravity={[0, -5.8, 0]}>
					{children}

					<Floor rotation={[Math.PI / -2, 0, 0]} color='black' />
				</Physics>

				<PointerLockControls />
			</Canvas>
			<Loader />
		</div>
	);
};

export default BasicScene;
