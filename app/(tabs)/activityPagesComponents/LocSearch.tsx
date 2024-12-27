import React from "react";
import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { LinearGradient } from "expo-linear-gradient";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";

import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocReview from "./LocReview";

const LocSearch: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [searchQuery, setSearchQuery] = useState("");
  const recommendations = [
    { locationName: "location one", keyID: "1" },
    { locationName: "two location", keyID: "2" },
    { locationName: "three location", keyID: "3" },
    { locationName: "four location", keyID: "4" },
    { locationName: "location one", keyID: "1" },
    { locationName: "two location", keyID: "2" },
    { locationName: "three location", keyID: "3" },
    { locationName: "four location", keyID: "4" },
  ];

  // Filter recommendations based on the search query
  const filteredRecommendations = recommendations.filter((item) =>
    item.locationName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={[styles.container, { marginTop: -insets.top }]}>
      <View style={styles.container}>
        {/* map view*/}
        <View style={styles.imageContainer}>
          <Image source={require("./map.jpeg")} style={styles.imageStyle} />
          <LinearGradient
            colors={["rgba(231, 231, 231, 0)", "rgba(231, 231, 231, 1)"]}
            locations={[0.9, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        </View>

        {/*inputview*/}
        <View style={styles.inputWTlocContainer}>
          <View style={styles.innerLocationContainer}>
            <Text style={styles.innerLocationText}>경기도 평택시</Text>
          </View>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() =>
              router.push(
                "./activityPagesComponents/innerScreenComponents_LocSearch/searchLocationPage",
              )
            }
          >
            <View style={styles.inputTextIconContainer}>
              <Entypo name="dot-single" size={26} color="orange" />
              <Text style={styles.innerButtonStyle}>위치를 입력하기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push(
                "./activityPagesComponents/innerScreenComponents_LocSearch/recentlyVisitedPage",
              )
            }
          >
            <View style={styles.buttonCenterContainer}>
              <FontAwesome6
                name="clock-rotate-left"
                size={24}
                color="#5E5E5F"
              />
              <Text style={styles.buttonTextStyle}>최근방문</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push(
                "./activityPagesComponents/innerScreenComponents_LocSearch/nearLocationsPage",
              );
            }}
          >
            <View style={styles.buttonCenterContainer}>
              <Ionicons name="golf" size={24} color="#5E5E5F" />
              <Text style={styles.buttonTextStyle}>근처골프장</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push(
                "./activityPagesComponents/innerScreenComponents_LocSearch/rankedLocationPage",
              );
            }}
          >
            <View style={styles.buttonCenterContainer}>
              <Entypo name="trophy" size={24} color="#5E5E5F" />
              <Text style={styles.buttonTextStyle}>인기골프장</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push(
                "./activityPagesComponents/innerScreenComponents_LocSearch/FavoritesLocationPage",
              );
            }}
          >
            <View>
              <FontAwesome name="star" size={24} color="#5E5E5F" />
              <Text style={styles.buttonTextStyle}>즐겨찾기</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  inputWTlocContainer: {
    alignSelf: "center",
    width: "90%",
    top: -45,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 7,
    marginBottom: 17,
    paddingHorizontal: 60,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  imageContainer: {
    //top: -60,
    width: "120%",
    marginLeft: -Dimensions.get("window").width * 0.1,
  },
  buttonsContainer: {
    top: -20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  innerLocationContainer: {
    marginLeft: 35,
    alignSelf: "flex-start",
  },
  inputTextIconContainer: {
    left: -40,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonCenterContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonTextStyle: {
    color: "#828282",
    fontSize: 12,
    marginTop: 10,
  },
  innerLocationText: {
    textAlign: "left",
    marginTop: 14,
    color: "#019780",
    fontWeight: "900",
    fontSize: 17,
    alignSelf: "center",
  },
  imageStyle: {
    width: "100%",
    height: 600,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  innerButtonStyle: {
    color: "black",
    fontSize: 20,
    lineHeight: 32,
    textAlign: "left",
    flex: 1,
  },
});

export default LocSearch;
