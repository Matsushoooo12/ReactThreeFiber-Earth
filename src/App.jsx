import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Model } from './Model';

export default function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '10000vh',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
        }}
      >
        <ambientLight />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
