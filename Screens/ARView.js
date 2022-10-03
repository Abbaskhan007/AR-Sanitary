// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import {
//   ViroARScene,
//   ViroText,
//   ViroConstants,
//   ViroARSceneNavigator,
//   Viro3DObject,
//   ViroAmbientLight,
//   ViroImage,
// } from "@viro-community/react-viro";

// const initialScene = () => {
//   const [position, setPosition] = useState([0, 0, -5]);
//   const [scale, setScale] = useState([0.3, 0.3, 0.3]);
//   const [rotation, setRotation] = useState([0, 50, 0]);

//   const moveObj = newPosition => {
//     setPosition(newPosition);
//   };

//   const rotateObj = (rotateState, rotationFactor, source) => {
//     console.log("________________");
//     if (rotateState === 3) {
//       let newRotation = [
//         rotation[0],
//         rotation[1] + rotationFactor,
//         rotation[2],
//       ];
//       console.log("New Rotation", newRotation);
//       setRotation(newRotation);
//     }
//   };

//   const pinchObj = (pinchState, scaleFactor, source) => {
//     if (pinchState == 3) {
//       let currentScale = scale[0];
//       let newScale = currentScale * scaleFactor;
//       setScale([newScale, newScale, newScale]);
//     }
//   };

//   return (
//     <ViroARScene>
//       <ViroAmbientLight color="#ffffff" />
//       <Viro3DObject
//         position={position}
//         scale={scale}
//         rotation={rotation}
//         source={{
//           uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1662995672/Couch_ardw6t.glb",
//         }}
//         onDrag={moveObj}
//         onPinch={pinchObj}
//         onRotate={rotateObj}
//         type="GLB"
//       />
//       {/* <ViroImage
//         position={position}
//         scale={scale}
//         width={1}
//         height={1}
//         //rotation={rotation}
//         onDrag={moveObj}
//         onPinch={pinchObj}
//         //onRotate={rotateObj}
//         source={require('./assets/sofa.png')}
//       /> */}
//     </ViroARScene>
//   );
// };

// export default () => {
//   return (
//     <ViroARSceneNavigator
//       initialScene={{
//         scene: initialScene,
//       }}
//       style={styles.f1}
//     />
//   );
// };

// var styles = StyleSheet.create({
//   f1: { flex: 1 },
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center",
//   },
// });

import { View, Text } from 'react-native'
import React from 'react'

export default function ARView() {
  return (
    <View>
      <Text>ARView</Text>
    </View>
  )
}
