import { StyleSheet, Text, View,TouchableOpacity, Button, FlatList, Alert, ActivityIndicator, Modal } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import {apilink} from '@env';
const UHome = ({route, navigation}) => {
  // const {id}=route.params
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({})
  const [logged, setLogged] = useState(route.params?logged:false)
  const [verified, setVerified] = useState(false)
  const [Deleting, setDeleting] = useState(false)
  async function Getid() {
    try {
      const userid= await AsyncStorage.getItem('userID')
      const Name= await AsyncStorage.getItem('username')
      const verf= await AsyncStorage.getItem('verification')
      if (userid) {
        // console.log(userid);
        setLogged(true)
        // console.log(verf);
        setUser({
          Name,
          id:userid,
        })
        if (verf=='true') {
        setVerified(true)
          
        } else {
          setVerified(false)
        }
        getApi(userid)
      } else {
        // console.log('no');
        setLogged(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getApi(id) {
    setLoading(true);
    await fetch(`${apilink}/user`, {
      method: "GET",
      headers:{
        Accept:'application/json',
        'Content-type':'application/json',
        'authentication': id
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json.userE);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        setData({})
        Alert.alert("Internet connection");
      });
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Getid()
      // console.log(1);
      });
  return unsubscribe;
    
  },[navigation]);
  return (
    <SafeAreaView style={[styles.body, { backgroundColor: "white" }]}>
      
      {/* header  */}
      <View style={styles.header}>
      {logged?<TouchableOpacity
          style={{ position: "absolute", left: 20 }}
          onPress={()=>{AsyncStorage.clear()
            Getid()
            setLoading(false)
            
          }}
        >
          <SimpleLineIcons name="logout" size={20} color="black" />
          {/* <Ionicons name="reload" size={20} color="black" /> */}
        </TouchableOpacity>:<View></View>}
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{logged?user.Name:'User Emergency'} </Text>
        {logged?<TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={Getid}
        >
          <Ionicons name="reload" size={20} color="black" />
        </TouchableOpacity>:<View></View>}
        
      </View>

      {/* body  */}
      <View style={[styles.body, {backgroundColor:'#f2f2f2',flex:1, width:'100%',justifyContent:loading?'center':'flex-start' ,alignItems:'center'}]}>
        {loading?<ActivityIndicator size='large' color='black' />:(logged?<View style={{width:'100%', alignItems:'center'}}>{verified?<View style={{ width: "90%" }}>
            <ListALL data={Data} userid={user.id} />
          </View>:<Button onPress={()=>navigation.navigate('verf')} title='verify account' color='black' />}</View>:<Button title='Login/ register' color='black' onPress={()=>navigation.navigate('auth')} />)}
        
      </View>
    </SafeAreaView>
  )
}

export default UHome



function ListALL(props) {
  const [maindata, setmaind]= useState(props.data)
  async function Delete(id){
    // setDeleting(true)
    await fetch(`${apilink}/delete/${id}`,{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json',
        'authentication':props.userid
      }
    }).then(res=>res.json()).then(json=>{
      // console.log(json);
      if (json.deleted==true) {
        Alert.alert('Deleted succesfully')
        const item= maindata.filter(i=>i._id!=id)
        setmaind(item)
      }
    }).catch(err=>{
      console.log(err);
      // setDeleting(false)
      Alert.alert('Network Error')
    })
  }
  return (
    <FlatList
      data={maindata}
      inverted={true}
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
          <View style={{ justifyContent:'space-between', flexDirection:'column' }}>
            <Text style={{ fontSize: 11 }}>{item.Date}</Text>
            <Button title='Delete' color='red' onPress={()=>Delete(item._id)}  />

          </View>
        </View>
      )}
    />
  );
}


const styles = StyleSheet.create({
  body:{
    flex:1
  },
  header:{
    width:'100%',
    backgroundColor:'white',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
    // elevation:10,
    // shadowColor: '#000',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity:  0.4,
    //     shadowRadius: 3,
        // elevation: 5,
  },
  itemss:{
    width:'100%',
    backgroundColor:'white',
    marginVertical:5,
    elevation:3,
    padding:10,
    borderRadius:10
  }
})