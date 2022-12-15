import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {apilink} from '@env';

const Home = () => {
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(location.host);
  async function getApi() {
    setLoading(true);
    await fetch(apilink, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData(json.lists);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        Alert.alert("Internet connection");
        console.log(err);
      });
  }
  useEffect(() => {
    
    getApi();
  }, []);
  return (
    <SafeAreaView style={[styles.body, { backgroundColor: "white" }]}>
      {/* header  */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Emergency</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={getApi}
        >
          <Ionicons name="reload" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.body,
          {
            backgroundColor: "#f2f2f2",
            flex: 1,
            width: "100%",
            justifyContent: loading ? "center" : "flex-start",
            alignItems: "center",
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : (
          <View style={{ width: "90%" }}>
            <ListALL data={Data} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

function ListALL(props) {
  const data = (props.data).reverse();
  return (
    <FlatList
      data={data}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemss}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "grey",
              marginBottom: 5,
            }}
          >
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.Name}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text>{item.State}</Text>
              <Text>{item.Flocation}</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "grey",
              marginBottom: 5,
            }}
          >
            <Text>{item.Descrption}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11 }}>{item.Date}</Text>
          </View>
        </View>
      )}
    />
  );
}

// export default ;
export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // elevation:10,
    // shadowColor: '#000',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity:  0.4,
    //     shadowRadius: 3,
    // elevation: 5,
  },
  itemss: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 5,
    elevation: 3,
    padding: 10,
    borderRadius: 10,
  },
});
