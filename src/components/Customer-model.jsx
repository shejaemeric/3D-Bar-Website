import React, { useEffect, useRef } from "react";
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useAnimations } from '@react-three/drei'
import { useFBX } from '@react-three/drei'
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Customer_Model({ animation, ...props }) {
  const group = useRef();
  const char1 = useRef();
  const char2 = useRef();
  const char3 = useRef();

  const { scene } = useGLTF('../../public/models/customer-model.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone);
    const {animations: idle} = useFBX('public/animations/Idle.fbx');
    const {animations: walk} = useFBX('public/animations/walking.fbx');
    const {animations: run} = useFBX('public/animations/running.fbx');
    const {animations: sit} = useFBX('public/animations/sit.fbx');
    const {animations: sit_talk} = useFBX('public/animations/sit_talk.fbx');
    const {animations: jump} = useFBX('public/animations/Jumping.fbx');
    const {animations: sit_idle} = useFBX('public/animations/Sitting-Idle.fbx');

    idle[0].name = 'idle';
    walk[0].name = 'walk';
    run[0].name = 'run';
    sit[0].name = 'sit';
    sit_talk[0].name = 'sit_talk';
    jump[0].name = 'jump';
    sit_idle[0].name = 'sit_idle'

    const animations = [...idle, ...walk, ...run,...sit,...sit_talk,...jump,...sit_idle];
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
      console.log(animation);  
     actions[animation]?.reset().fadeIn(0.24).play();
      return () => actions?.[animation]?.fadeOut(0.24);
    }, [animation]);

    useEffect(() => {
    },[animation])


  return (
    <group {...props} dispose={null} ref={group}>
      <group rotation-x={-Math.PI / 2} ref={char1}>
      <primitive object={nodes.Hips} ref={char2}/>
      <skinnedMesh ref={char3} name="Wolf3D_Avatar" geometry={nodes.Wolf3D_Avatar.geometry} material={materials.Wolf3D_Avatar} skeleton={nodes.Wolf3D_Avatar.skeleton} morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('../../public/models/customer-model.glb')
