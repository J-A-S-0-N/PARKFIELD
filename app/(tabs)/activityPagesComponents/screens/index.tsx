/*

subcomponents to impliment:
map container

*/
import React from 'react';
import { useState } from 'react';

import { View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  FlatList, 
  Dimensions, 
} from 'react-native';

import { useRouter } from 'expo-router';
//import { LinearGradient } from "expo-linear-gradient"
//import { dismiss } from 'expo-router/build/global-state/routing';
//import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LocReview from './LocReview';

const INDEX: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);


  const [searchQuery, setSearchQuery] = useState('');
  const recommendations = [
    {locationName:"locationName", keyID: "1"},
  ];

  // Filter recommendations based on the search query
  const filteredRecommendations = recommendations.filter((item) =>
    item.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={[styles.container, { marginTop: -insets.top }]}>
      <View style={styles.container}>
        {/* map view*/}
        <View style={styles.imageContainer}>
          <Image
            source={require('./map.jpeg')}
            style={styles.imageStyle}
          />
        </View>

        {/*inputview*/}
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.inputBox}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder='위치를 입력하시오...'
          >
          </TextInput>
        </View>

        {/*recommendation*/}
        {searchQuery && (
          <FlatList
            data={filteredRecommendations}
            keyExtractor={(item) => item.keyID}
            renderItem={({ item }) => (
              <View style={styles.recommendationItem}>
                <Text style={styles.recommendationText}>{item.locationName}</Text>
                <TouchableOpacity 
                  style={{alignItems: "center", justifyContent: "center"}}
                  onPress={() => {
                    openModal();
                  }}
                >
                  <View style={styles.innerButton_recommendation}>
                    <Text style={{color:"#E4E3E4"}}>
                      확인하기
                    </Text>
                  </View>
                </TouchableOpacity>
                <LocReview isVisible={isModalVisible} onClose={closeModal}/>
              </View>
            )}
            style={styles.recommendationList}
          />
        )}    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //Container
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    //paddingHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  mapContainer: {
    //backgroundColor: "black", //temp value change later
    width: "100%",
    height: 250
  },
  inputContainer: {
    //top: -70,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 60,
    backgroundColor: "#B0B0B0",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,

  },
  imageContainer: {
    //top: -60,
    width: "120%",
    marginLeft: -Dimensions.get("window").width* 0.1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
  },





  recommendationList: {
    backgroundColor: "#D7D7D7",
    borderRadius: 5,
    marginBottom:10,
    //top: -75,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  recommendationText: {
    top: -10,
    fontSize: 16,
    alignSelf: "flex-end",
    textAlign: "center",
    color: '#333',
  },
  innerButton_recommendation: {
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#525251",
    width: 78,
    height: 37,
    borderRadius: 3,

  },




  imageStyle: {
    width: "100%",
    height: 400,
  },
  locationTEXT: {
    fontSize:19,
    fontFamily: "bold"
  },
  inputBox:{
    borderWidth: 1,
    borderColor: "#B0B0B0",
    width: '100%',
    borderRadius: 5,
  },

});

export default INDEX;
