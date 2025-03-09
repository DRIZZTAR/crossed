import { useTexture, useVideoTexture } from '@react-three/drei';
import { Color } from 'three';
import BaseBox from '../ui/BaseBox';

// Function to determine if a source is likely a video
function isVideoFormat(path) {
	if (!path) return false;
	const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
	return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

// Component for video textured boxes
function VideoBox({ videoPath, ...props }) {
	// Configure video texture with autoplay and loop
	const texture = useVideoTexture(videoPath, {
		unsuspend: 'canplay',
		muted: true,
		loop: true,
		start: true,
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
		return <BaseBox color={new Color(0.2, 0.2, 0.8)} {...props} />;
	}
}

// Component that determines whether to use image or video texture
function MediaBox({ mediaPath, ...props }) {
	const mediaType = isVideoFormat(mediaPath) ? 'video' : 'image';

	if (mediaType === 'video') {
		return <VideoBox videoPath={mediaPath} {...props} />;
	} else {
		return <ImageBox texturePath={mediaPath} {...props} />;
	}
}

export default MediaBox;
