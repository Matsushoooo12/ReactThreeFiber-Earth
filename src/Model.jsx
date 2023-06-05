/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';

export const Model = () => {
  const gltf = useLoader(GLTFLoader, './models/earth.glb');
  const mesh = useRef();
  const [isScrolling, setIsScrolling] = useState(false);
  const { actions } = useAnimations(gltf.animations, mesh);
  const scrollTimeout = useRef(null);
  const scrollRef = useRef(0);
  useEffect(() => {
    // スクロールイベントのハンドラを設定
    const handleScroll = () => {
      setIsScrolling(true);
      scrollRef.current = window.scrollY;
      // スクロール停止のタイムアウトが設定されている場合はキャンセルする
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // 500ミリ秒後にスクロール停止とみなす
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false); // スクロールが停止したとみなす
      }, 50);
      actions['Action'].play();
      actions['Icosphere.003Action'].play();
      actions['Icosphere.005Action.001'].play();
      actions['Icosphere.009Action'].play();
      actions['Icosphere.010Action'].play();
      actions['Icosphere.012Action'].play();
      actions['Icosphere.013Action'].play();
    };

    window.addEventListener('scroll', handleScroll);

    // コンポーネントがアンマウントされたときにイベントリスナを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // スクロール停止のタイムアウトが設定されている場合はクリアする
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [actions]); // 依存配列は空で、この useEffect フックは一度だけ実行されます。
  // フレームごとに実行される
  useFrame(() => {
    if (mesh.current) {
      if (isScrolling) {
        // アニメーションの再生速度を元に戻す
        Object.values(actions).forEach((action) => {
          action.paused = false;
        });
      } else {
        // アニメーションの再生速度を0に設定する
        Object.values(actions).forEach((action) => {
          action.paused = true;
        });
      }
      // スクロール量に応じて回転
      const rotation = scrollRef.current * 0.0001; // 回転の速度を調整するために 0.001 を掛けています。
      mesh.current.rotation.x = rotation;
      mesh.current.rotation.y = rotation;
      mesh.current.rotation.z = rotation;
    }
  });
  return <primitive ref={mesh} object={gltf.scene} dispose={null} />;
};
