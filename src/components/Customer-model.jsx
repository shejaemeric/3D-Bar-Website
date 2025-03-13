import React, { useEffect, useRef } from "react";
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useAnimations } from '@react-three/drei'
import { useFBX } from '@react-three/drei'

export function Customer_Model({ animation, ...props }) {
  const group = useRef();
  const { scene } = useGLTF('../../public/models/customer-model.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone);
    const {animations: idle} = useFBX('public/animations/Idle.fbx');
    const {animations: walk} = useFBX('public/animations/walking.fbx');
    const {animations: run} = useFBX('public/animations/running.fbx');
    idle[0].name = 'idle';
    walk[0].name = 'walk';
    run[0].name = 'run';
    const animations = [...idle, ...walk, ...run];
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
      actions[animation]?.reset().fadeIn(0.24).play();
      return () => actions?.[animation]?.fadeOut(0.24);
    }, [animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <group rotation-x={-Math.PI / 2}>
      <primitive object={nodes.Hips} />
      <skinnedMesh name="Wolf3D_Avatar" geometry={nodes.Wolf3D_Avatar.geometry} material={materials.Wolf3D_Avatar} skeleton={nodes.Wolf3D_Avatar.skeleton} morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('../../public/models/customer-model.glb')
