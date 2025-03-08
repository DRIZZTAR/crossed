import { Sky, Float, useTexture, useVideoTexture } from '@react-three/drei';
import { Suspense } from 'react';
import { Color } from 'three';

import BaseScene from './ui/BaseScene';
import BaseBox from './ui/BaseBox';
import ThreeModel from './components/ThreeModel.js';
import BaseCharacter from './ui/BaseCharacter';

// Enhanced Media Box that handles both images and videos
function MediaBox({ mediaPath, ...props }) {
	return <BoxWithMedia mediaPath={mediaPath} {...props} />;
}

// Function to determine if a source is likely a video
function isVideoFormat(path) {
	if (!path) return false;
	const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
	return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

// Component that determines whether to use image or video texture
function BoxWithMedia({ mediaPath, ...props }) {
	// Determine media type immediately instead of using state and useEffect
	const mediaType = isVideoFormat(mediaPath) ? 'video' : 'image';

	if (mediaType === 'video') {
		return <VideoBox videoPath={mediaPath} {...props} />;
	} else {
		return <ImageBox texturePath={mediaPath} {...props} />;
	}
}

// Component for video textured boxes
function VideoBox({ videoPath, ...props }) {
	// Configure video texture with autoplay and loop
	const texture = useVideoTexture(videoPath, {
		unsuspend: 'canplay', // Start playing as soon as enough data is loaded
		muted: true, // Most browsers require muted for autoplay
		loop: true, // Loop the video
		start: true, // Start playing immediately
		crossOrigin: 'Anonymous',
	});

	return <BaseBox texture={texture} {...props} />;
}

// Component for image textured boxes
function ImageBox({ texturePath, ...props }) {
	try {
		const texture = useTexture(texturePath);
		return <BaseBox texture={texture} {...props} />;
	} catch (error) {
		console.error('Error loading image texture:', error);
		// Fallback to a colored box if image fails
		return <BaseBox color={new Color(0.2, 0.2, 0.8)} {...props} />;
	}
}

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
					<MediaBox
						mediaPath='https://pbs.twimg.com/profile_images/1796035559175106560/-C_AdBy2_400x400.jpg'
						position={[-5.0, 1.0, 0]}
						args={[2, 2, 2]}
					/>
					{/* Example of video texture */}
					<MediaBox
						mediaPath='/ad.mp4'
						position={[5.0, 1.0, 5.0]}
						args={[4, 2, 4]}
					/>
					<MediaBox
						mediaPath='/largeLogo.png'
						position={[2.0, 1.0, -5.0]}
						args={[2, 2, 3]}
					/>
					<BaseCharacter controls position={[0, 2, -4.0]} args={[0.5]} color='yellow' />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, -5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, 10]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-10, 0, 5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[-5, 0, -5]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[0, 0, -10]} />
					<ThreeModel args={[0.5, 2, 0.5]} scale={0.5} position={[10, 0, 5]} />
					<Sky />
				</Suspense>
			</BaseScene>
		</div>
	);
}

export default App;
