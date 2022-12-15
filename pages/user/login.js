import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    uchableOpacity,
    TextInput,
    Keyboard,
    Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {apilink} from '@env';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
function Login(props) {
    const navi = props.nav;
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Load, setLoad] = useState(false);
    const [ERRTXT, setERRTXT] = useState("");

    async function logg() {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (Email.length>=5) {
        if (Email.match(validRegex)) {
          if (password.length>=6) {
            var passw=  /^[A-Za-z]\w{7,14}$/;
            // if (password.match(passw)) {
              setLoad(true)
              setERRTXT('')
              const bdy={
                email:Email,
                password
              }
              await fetch(apilink+'/login',{
                method:'POST',
                headers:{
                  Accept:'application/json',
                  'Content-type':'application/json'
                },
                body:JSON.stringify(bdy)
              }).then(res=>res.json()).then(json=>{
                setLoad(false)
                if (json.email==true) {
                  if (json.password==true) {
                    AsyncStorage.setItem('userID', json.user._id)
                    AsyncStorage.setItem('username',json.user.Username)
                    AsyncStorage.setItem('verification',(json.user.verified).toString())

                    navi.navigate('home')
                  } else {
                    setERRTXT('email or password doesnt exist')
                  }
                } else {
                  setERRTXT('Email doesnt exist')
                }
              }).catch(err=>{
                console.log(err);
                setERRTXT('network error')
              })
            // } else {
            //   setERRTXT('invalid password');
            // }
          } else {
            setERRTXT('pasword should be greater than 5')
          }
        } else {
        setERRTXT('Invalid email address')
          
        }
        
      } else {
        setERRTXT('Email should be greter than 5')
      }
    }
    return (
      <View
        style={{
          display: props.disp,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Load ? (
          <ActivityIndicator style={{marginTop:'55%'}} size="large" color="black" />
        ) : (
          <View>
            <Text
              style={{
                textAlign: "center",
            marginBottom: 20,
           fontSize: 17,
                fontWeight: "400",
                marginTop:80
              }}
            >
              {ERRTXT}
            </Text>
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={setEmail}
                style={styles.inputs}
                placeholder="Email: user@email.com"
                keyboardType="email-address"
                autoComplete="email"
                autoFocus={true}
                maxLength={20}
              />
            </View>
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={setPassword}
                style={styles.inputs}
                placeholder="Password: a-z A-Z 0-9 example abc123$$"
                secureTextEntry
                autoComplete="password"
                maxLength={14}
              />
            </View>
            <Button title={props.title} color="black" onPress={logg} />
          </View>
        )}
      </View>
    );
  }


export default Login


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
      paddingHorizontal: 8,
    },
  });
  