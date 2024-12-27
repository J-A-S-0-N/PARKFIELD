/*

subcomponents to impliment:
map container

*/

//import { useRouter } from 'expo-router';
import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Modal from 'react-native-modal';
import { useSearchParams } from 'expo-router/build/hooks';
import { useRouter } from 'expo-router/build/hooks';


//const {WINwidth, WINheight} = Dimensions.get('window');

type pararmVariable = {
  locationName: string,
  keyID: string,
};

type modalProp = {
  isVisible: boolean,
  onClose: () => void
};

const LocReview: React.FC<modalProp> = ({ isVisible, onClose }) => {

  const router = useRouter();
  //touch functions
  const backButton = () => {
    router.back()
  };
  const confirmButton = () => {
    //router.push();
  };
  //const router = useRouter(); 
  // dont work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const PARAMS = useSearchParams() as unknown as pararmVariable;
  const {locationName, keyID} = PARAMS;
  console.log(locationName);
  console.log(keyID);
  // dont work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor='rgba(0,0,0,0.7)'
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        {/*map section???*/}
        <View style={styles.mapContainer}>
          <View style={{backgroundColor: "black"}}>
            {/*map component goes here*/}
          </View>
        </View>

        {/*stat section*/}
        <View style={styles.statContainer}>
          <View style={styles.subSTATContainer}> 
            <Text>
              stat section
            </Text>
          </View>

          <View style={styles.subSTATContainer}> 
            <Text>
              stat section
            </Text>
          </View>
        </View>

        {/*confirmation section*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={confirmButton}
          >
            <View style={styles.buttonStyle}>
              <Text> 
                confirm
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={backButton}
          >
            <View style={styles.buttonStyle}>
              <Text>
                back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //Container
  modalContainer: {
    flex:1,
    width: 599,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor:"black",
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  mapContainer: {
    backgroundColor: "black",
    flex: 1,
    height: 40
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  statContainer: {
    flexDirection: "column",
  },
  subSTATContainer: {
    flexDirection: "row"
  },



  locationTEXT: {
    fontSize: 50,
  },
  buttonStyle: {

  }
});

export default LocReview;
