import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
 import {apilink} from '@env';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {Picker} from '@react-native-picker/picker';
  
  function Register(props) {
    const navi = props.nav;
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState('')
    // const [state, setState] = useState('')
    const [desciption, setDesciption] = useState(``)
  
    const [Load, setLoad] = useState(false);
    const [ERRTXT, setERRTXT] = useState("");

    // const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    // const itemss=[{
    //   label:'FCT', value:'FCT'
    // },{
    //   label:'Lagos', value:'Lagos'
    // }]
    async function register() {
        if (Username.length>3 && isNaN(Username)==true) {
            if (Email.length>=5) {
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (Email.match(validRegex)) {
                    if (password.length>=6) {
                        // var passw=  /^[A-Za-z]\w{7,14}$/;

                        // if (password.match(passw)) {
                            if (location.length>=6 && isNaN(location)==true) {
                                if (value.length>=2 && isNaN(value)==true) {
                                    if (desciption.length>10 && isNaN(desciption)) {
                                        const bdy = {
                                          username:Username,
                                          email:Email,
                                          password,
                                          location,state:value,description:desciption
                                        }
                                        setLoad(true)
                                        await fetch(`${apilink}/register`,{
                                          method:'POST',
                                          headers:{
                                            Accept:'application/json',
                                            'Content-type':'application/json'
                                          },
                                          body:JSON.stringify(bdy)
                                        }).then(res=>res.json()).then(json=>{
                                          setLoad(false)
                                          console.log(json);
                                          if (json.input==true) {
                                            AsyncStorage.setItem('username',json.user.main.Username)
                                            // AsyncStorage.setItem('State',json.user.others.State)
                                            AsyncStorage.setItem('userID', json.user.main._id)
                                            AsyncStorage.setItem('verification',(json.user.main.verified).toString())

                                            navi.navigate('auth')
                                          } else {
                                            setERRTXT('check input')
                                          }
                                        }).catch(err=>{
                                          console.log(err);
                                          setERRTXT('error registering')
                                        })
                                    } else {
                                        setERRTXT('Description should be greater than 10 characters nd should not be a number')
                                        
                                    }
                                } else {
                                setERRTXT('Error with state please contact admin')
                                    
                                }
                            } else {
                                setERRTXT('Location should be greater than 5 nd should not be a number')
                            }
                        // } else {
                        //     setERRTXT('Invalid password')
                        // }
                    } else {
                        setERRTXT('Password should be greater than 5')
                    }
                } else {
                    setERRTXT('Invalid email')
                }
            } else {
                setERRTXT('Email should be greater than 4')
            }
        } else {
            setERRTXT('username should be greater than 3 nd should not be a number')
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
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 30,
                fontSize: 15,
                fontWeight: "400",
                width:300
              }}
            >
              {ERRTXT}
            </Text>
  
            {/* username  */}
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                onChangeText={setUsername}
                style={styles.inputs}
                placeholder="Username: JohnDoe123"
                keyboardType='default'
                autoComplete='username'
                autoFocus={true}
              />
            </View>
  
            {/* email */}
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={setEmail}
                style={styles.inputs}
                placeholder="Email: user@email.com"
                keyboardType="email-address"
                autoComplete="email"
                // autoFocus={true}
              />
            </View>
  
            {/* password */}
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={setPassword}
                style={styles.inputs}
                placeholder="Password: a-z A-Z 0-9 example abc123$$"
                secureTextEntry
                autoComplete="password"
                maxLength={15}
              />
            </View>
  
            {/* location  */}
            <View style={styles.inpVIW}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                onChangeText={setLocation}
                style={styles.inputs}
                placeholder="Location"
                keyboardType='default'
                autoComplete='postal-address-locality'
              />
            </View>
  
            {/* State  */}
            <View style={styles.inpVIW}>
              <Text style={styles.label}>State</Text>
              
              <Picker style={styles.inputs}
            onValueChange={(itemvalue) => setValue(itemvalue)}
              selectedValue={value}
           >
          <Picker.Item label="FCT" value='Abuja' />
          <Picker.Item label="Abia" value='Abia' />
          <Picker.Item label="Adamawa" value='Adamawa' />
          <Picker.Item label="Akwa Ibom" value='Akwa Ibom' />
          <Picker.Item label="Anambra" value='Anambra' />
          <Picker.Item label="Bauchi" value='Bauchi' />
          <Picker.Item label="Bayelsa" value='Bayelsa' />
          <Picker.Item label="Benue" value='Benue' />
          <Picker.Item label="Borno" value='Borno' />
          <Picker.Item label="Cross River" value='Cross River' />
          <Picker.Item label="Delta" value='Delta' />
          <Picker.Item label="Ekiti" value='Ekiti' />
          <Picker.Item label="Enugu" value='Enugu' />
          <Picker.Item label="Gombe" value='Gombe' />
          <Picker.Item label="Imo" value='Imo' />
          <Picker.Item label="Jigawa" value='Jigawa' />
          <Picker.Item label="Kaduna" value='Kaduna' />
          <Picker.Item label="Kano" value='Kano' />
          <Picker.Item label="Katsina" value='Katsina' />
          <Picker.Item label="Kebbi" value='Kebbi' />
          <Picker.Item label="Kogi" value='Kogi' />
          <Picker.Item label="Kwara" value='Kwara' />
          <Picker.Item label="Nasarawa" value='Nasarawa' />
          <Picker.Item label="Niger" value='Niger' />
          <Picker.Item label="Ogun" value='Ogun' />
          <Picker.Item label="Osun" value='Osun' />
          <Picker.Item label="Oyo" value='Oyo' />
          <Picker.Item label="Plateau" value='Plateau' />
          <Picker.Item label="Rivers" value='Rivers' />
          <Picker.Item label="Sokoto" value='Sokoto' />
          <Picker.Item label="Taraba" value='Taraba' />
          <Picker.Item label="Yobe" value='Yobe' />
          <Picker.Item label="Zamfara" value='Zamfara' />
            
        </Picker>
            </View>
  
            {/* Desciption  */}
            <View style={[styles.inpVIW,{height:50}]}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                onChangeText={setDesciption}
                style={styles.inputs}
                placeholder="Descriptions"
                keyboardType='default'
                multiline
              />
            </View>
  
            <Button title={props.title} color="black" onPress={register} />
          </View>
        )}
      </View>
    );
  }
  

export default Register

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
  