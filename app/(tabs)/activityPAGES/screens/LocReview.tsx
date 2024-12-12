/*
subcomponents to impliment:
map container
*/

//import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { useRouter } from 'expo-router/build/hooks';

type pararmVariable = {
  locationName: string,
  keyID: string,
}

const LocReview = () => {
  const router = useRouter();
  //touch functions
  const backButton = () => {
    router.back()
  };

  const confirmButton = () => {
    //router.push();
  };

  //const router = useRouter(); 
  const PARAMS = useSearchParams() as unknown as pararmVariable;
  const {locationName, keyID} = PARAMS;
  console.log(locationName);
  console.log(keyID);

  return (
    <View style={styles.modalContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  //Container
  modalContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: 200,
  },
  container: {
    height: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  mapContainer: {
    backgroundColor: "black", //temp value change later
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
