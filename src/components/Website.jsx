import React from 'react';
import { Html } from '@react-three/drei';

const Website = ({
	position = [0, 0, 0],
	url,
	children,
	scale = 1,
	rotation,
	width = 800,
	height = 500,
}) => {
	return (
		<Html
			transform
			position={position}
			scale={scale}
			rotation={rotation}
			style={{
				transition: 'all 0.2s',
				padding: '10px',
				background: 'rgba(255, 255, 255, 0.45)',
				borderRadius: '0px',
				transform: 'translate3d(-50%, -50%, 0)',
			}}
		>
			<div style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}>
				<iframe
					src={url}
					title='Embedded Website'
					width='100%'
					height='100%'
					style={{ border: 'none' }}
		
				/>
			</div>
		</Html>
	);
};

export default Website;
