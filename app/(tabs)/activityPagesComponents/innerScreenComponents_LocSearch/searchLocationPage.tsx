// functioanlity idea
// 1:
// instead of fetching all locations from  firebase
// just fetch one more screen at a time and constantly have two pages ready
// will minimize unncessarty fetches -> lower clost
// 2:

// TODO:
// -
// FIXME:
// - FlatList not shown when there isnt any input
// - Two children when the same child issue $38 -> duplicated 38

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import FontAwesome from "@expo/vector-icons/FontAwesome";

//import { firestore } from "../firebaseConfig"; // Adjust the path to your Firebase config file
import { db } from "@/services/firebaseConfig.js";

type DataItem = {
  id: string;
  distance: number;
  holes: number;
  locationName: string;
};

export default function InnerLocationSelection() {
  const router = useRouter();

  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const locationsRef = collection(db, "locations");

  // Initial fetch
  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(locationsRef, limit(10));
      const querySnapshot = await getDocs(q);
      const fetchedData: DataItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as DataItem);
      });
      setData(fetchedData);
      setFilteredData(fetchedData);
      if (!querySnapshot.empty) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Load more data
  const loadMoreData = async () => {
    if (!lastVisible || isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    try {
      const q = query(locationsRef, startAfter(lastVisible), limit(10));
      const querySnapshot = await getDocs(q);
      const fetchedData: DataItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as DataItem);
      });

      setData((prevData) => [...prevData, ...fetchedData]);

      if (searchQuery) {
        const filteredFetchData = fetchedData.filter((item) =>
          item.locationName.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredData((prevData) => [...prevData, ...filteredFetchData]);
      } else {
        setFilteredData((prevData) => [...prevData, ...fetchedData]);
      }

      if (!querySnapshot.empty) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more data: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Search filter
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();

    setFilteredData(
      data.filter((item) =>
        item.locationName.toLowerCase().includes(lowercasedQuery),
      ),
    );
  };

  // Rendering each item
  const renderingFunction = ({ item }: { item: DataItem }) => (
    <View style={{ flexDirection: "column" }}>
      <View style={{ marginVertical: 13 }}>
        <TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.itemContainer}>
              <Text>{item.locationName}</Text>
            </View>
            <View style={styles.favoriteContainer}>
              <TouchableOpacity style={{ width: 20, height: 20 }}>
                <FontAwesome name="star" size={20} color="#CECFCC" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
            {item.distance} KM
          </Text>
        </TouchableOpacity>
      </View>
      {/* seperator */}
      <View
        style={{
          height: 2,
          backgroundColor: "#DFDFDF",
          marginTop: 2,
          borderRadius: 2,
        }}
      ></View>
    </View>
  );

  // Footer loader
  const renderFooter = () => {
    if (isFetchingMore) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ff6347" />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="입력하시오..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderingFunction}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E1E1",
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  locationNameContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  favoriteContainer: {
    /*
    width: 20,
    height: 20,
    //marginTop: -5,
    */
    //paddingVertical: 10,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    marginTop: 5,
    borderRadius: 5,
    alignSelf: "center",
    width: "95%",
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  inputBox: {
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 7,
    paddingVertical: 15,
    backgroundColor: "#E1E1E1",
    width: "100%",
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemSubText: {
    fontSize: 14,
    color: "#666",
  },
});
