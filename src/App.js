import { Float, Text3D } from '@react-three/drei';
import { Suspense } from 'react';

import BaseScene from './ui/BaseScene';
import MediaBox from './components/MediaBox';
import ThreeModel from './components/ThreeModel.js';
import BaseCharacter from './ui/BaseCharacter';
import Website from './components/Website';


function App() {
	return (
		<div className='app-container'>
			<BaseScene>
				<Suspense fallback={null}>
					<Float
						floatIntensity={5}
						speed={4}
						floatingRange={[0.1, 1]}
						rotationIntensity={3.0}
					>
						<MediaBox
							mediaPath='https://media.licdn.com/dms/image/v2/D4D0BAQEwBN6QXDBnjA/company-logo_200_200/company-logo_200_200/0/1693347608148/createxyz_logo?e=2147483647&v=beta&t=vEIFPAOzr9a06iYQtzzrkhTZTG0EFBwxJzC6S7KG9CI'
							position={[0, 1.0, 0]}
							args={[2, 2, 2]}
						/>
					</Float>
					<Website
						position={[15.0, 0.5, 6]}
						rotation={[0, Math.PI * 1.5, 0]}
						scale={0.5}
						url='https://threejs.org/docs/'
					>
						Visit create.xyz
					</Website>
					<MediaBox
						mediaPath='https://pbs.twimg.com/profile_images/1796035559175106560/-C_AdBy2_400x400.jpg'
						position={[-5.0, 1.0, 0]}
						args={[2, 2, 2]}
					/>
					{/* Example of video texture */}
					<Float rotationIntensity={0.3} floatIntensity={0.2} position={[0, 1, 0]}>
						<Text3D
							font={'helvetiker_regular.typeface.json'}
							rotation={[0, Math.PI * 1, 0]}
							position={[7.5, 3.0, 5.0]}
						>
							{`Replicate`}
							<meshStandardMaterial color={'black'} metalness={1.0} roughness={0.0} />
						</Text3D>
						<MediaBox mediaPath='/ad.mp4' position={[5.0, 1.0, 5.0]} args={[4, 2, 1]} />
					</Float>
					<MediaBox
						mediaPath='/largeLogo.png'
						position={[2.0, 0.9, -5.0]}
						args={[4, 2.5, 4]}
					/>
					<BaseCharacter controls position={[0, 2, -4.0]} args={[0.5]} color='yellow' />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
				</Suspense>
			</BaseScene>
		</div>
	);
}

export default App;
