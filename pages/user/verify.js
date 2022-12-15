import { StyleSheet, Text, TouchableOpacity, View,ActivityIndicator, TextInput, Button,Pressable, Keyboard } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {apilink} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
const Verify = ({navigation}) => {
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(true)
    const [verified, setVerified] = useState(false)
    const [loading, setLoading] = useState(true);
    const [errtxt, setErrtxt] = useState('')
    const [OTP, setOTP] = useState('')
    const [btnenb, setBtnenb] = useState(true)
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
            getotp(userid)
          } else {
            // console.log('no');
            setLogged(false)
          }
        } catch (error) {
          console.log(error);
        }
      }
      async function getotp(id) {
        // console.log('internal');
        setLoading(true)
        await fetch(`${apilink}/v/otp/${id}`,{
            method:'GET'
        }).then(res=>res.json()).then(json=>{
            setLoading(false)
            if (json.upload==true) {
                setBtnenb(false)
                setErrtxt(`Otp sent to ${json.details.Email} 🎊`)
            } else {
                setErrtxt('Could not send OTP');
                setBtnenb(true)
            }
        }).catch(err=>{
            console.log(err);
            setErrtxt('error occured due to network refresh')
            setLoading(false)
            setBtnenb(true)
        })
      }
    async function send(id) {
        if (OTP.length==4) {
            if (isNaN(OTP)==false) {
                setLoading(true)
                console.log(OTP);
                await fetch(`${apilink}/v/otp/${user.id}`,{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({Otp:OTP})
                }).then(res=>res.json()).then(json=>{
                    setLoading(false)
                    // console.log(json);
                    if (json.otp==true) {

                        if (json.verified==true) {
                            AsyncStorage.setItem('verification','true')
                            navigation.navigate('home')
                        } else {
                            setErrtxt('unable to verify')
                        }
                    } else {
                        setErrtxt('Incorrect OTP')
                    }
                }).catch(err=>{
                    console.log(err);
                    setLoading(false)
                    setErrtxt('error due to network')
                })
            } else {
                setErrtxt('OTP must be number')
            }
        } else {
            setErrtxt('Otp must be 4')
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Getid()
            // console.log(1);
            });
        return unsubscribe;
    }, [navigation]);
    return (
    <SafeAreaView style={[styles.body, { backgroundColor: "white" }]}>
        <Pressable style={[styles.body, { backgroundColor: "white" }]} onPress={()=>Keyboard.dismiss()} >
        {/* header */}
        <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{logged?user.Name:'User Emergency'} </Text>        
        {loading?<View></View>:<TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={Getid}
        >
          <Ionicons name="reload" size={20} color="black" />
        </TouchableOpacity>}
      </View>

      {/* body */}
      <View style={[styles.body, {backgroundColor:'#f2f2f2',flex:1, width:'100%',justifyContent:'center',alignItems:'center'}]}>
        {loading?<ActivityIndicator color='black' size='large' />:(
            <View>
                <Text
              style={{
                textAlign: "center",
            marginBottom: 20,
           fontSize: 17,
                fontWeight: "400",
                // marginTop:80
              }}
            >
              {errtxt}
                </Text>
                <View style={styles.inpVIW}>
              <TextInput
                onChangeText={setOTP}
                style={styles.inputs}
                placeholder="OTP here"
                keyboardType='number-pad'
                autoFocus={true}
                maxLength={4}
              />
            </View>
            <Button color='black' title='Verify' disabled={btnenb} onPress={send} />
            </View>
        )}
      </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default Verify


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
  },
  inpVIW: {
    width: 300,
    // backgroundColor:'green',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputs: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    fontSize: 15,
    justifyContent:'space-evenly',
    alignItems:'center',
    textAlign:'center',
    letterSpacing:30
  },
})