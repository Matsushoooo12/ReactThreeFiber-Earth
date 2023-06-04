/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from '@react-three/fiber';

const Model = () => {
  const gltf = useLoader(GLTFLoader, './models/earth2.glb');
  const mesh = useRef();
  const scrollRef = useRef(0);
  useEffect(() => {
    // スクロールイベントのハンドラを設定
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    // コンポーネントがアンマウントされたときにイベントリスナを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 依存配列は空で、この useEffect フックは一度だけ実行されます。
  // フレームごとに実行される
  useFrame(() => {
    if (mesh.current) {
      // スクロール量に応じて回転
      const rotation = scrollRef.current * 0.0001; // 回転の速度を調整するために 0.001 を掛けています。
      mesh.current.rotation.x = rotation;
      mesh.current.rotation.y = rotation;
      mesh.current.rotation.z = rotation;
    }
  });
  return <primitive ref={mesh} object={gltf.scene} dispose={null} />;
};

export default function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '6000vh',
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
