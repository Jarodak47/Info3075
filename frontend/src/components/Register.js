import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { useState } from "react";
import tw from "twrnc";
import axios from "axios";
import InputField from "./InputField";
import DatePicker from "react-native-datepicker";
import { Input, Card, Button } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Register = ({ navigation }) => {
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";
  const mtn_URL =
    "https://info307-production.up.railway.app/account/register-mtn/";
  const age_URL =
    "https://info307-production.up.railway.app/account/register-agent/";
    const [frontImage, setFrontImage] = useState(null);
        const [backImage, setBackImage] = useState(null);
        const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          console.log(result);

          if (!result.canceled) {
            setFrontImage(result.assets[0].uri);
          }
        };
         const pickImage2 = async () => {
           // No permissions request is necessary for launching the image library
           let result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.All,
             allowsEditing: true,
             aspect: [4, 3],
             quality: 1,
           });

           console.log(result);

           if (!result.canceled) {
             setBackImage(result.assets[0].uri);
           }
         };
   const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [idNum, setIdNum] = useState("");
  const [mtnId, setMtnId] = useState("")

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  console.warn("A date has been picked: ");
  hideDatePicker();
};


  const create_mtn = (event) => {
    event.preventDefault();
    axios
      .post(mtn_URL, {
        profile_pic: null,
        id_num: idNum,
        date_of_birth: null,
        place_of_birth: date,
        address: address,
        first_name: firstName,
        last_name: lastName,
        front_pic: null,
        rear_pic: null,
        balance: 0,
        verified: true,
        
      })
      .then((response) => {
        console.log(response.data);
        alert("Success");
		setMtnId(response.data.id)
		console.log(mtnId)
        navigation.navigate("MomoRegister", { mtn_id: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={[s.container]}>
      <Card>
        <Card.Title>Create Account</Card.Title>
        <Card.Divider />
        <InputField
          label={"First Name"}
          value={firstName}
          onChange={(e) => setFirstName(e)}
        />
        <InputField
          label={"Last Name"}
          value={lastName}
          onChange={(e) => setLastName(e)}
        />
        <InputField
          label={"Id Num"}
          value={idNum}
          onChange={(e) => setIdNum(e)}
        />
        <InputField
          label={"Address"}
          value={address}
          onChange={(e) => setAddress(e)}
        />
        <InputField
          label={"Place of Birth"}
          value={placeOfBirth}
          onChange={(e) => setPlaceOfBirth(e)}
        />
        <View>
          <Text>
            Date of Birth
          </Text>
          <Button title={date ? date.toDateString() : "Date of Birth"} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            // display="calender"
            themeVariant="light"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <Button
          title="Front Of ID"
          onPress={pickImage}
          style={{ marginTop: 10 }}
        />
        {frontImage && (
          <Image
            source={{ uri: frontImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button
          title="Back Of ID"
          onPress={pickImage2}
          style={{ marginTop: 10 }}
        />
        {backImage && (
          <Image
            source={{ uri: backImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        ></View>

        <Button title={"Register"} onPress={create_mtn} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
};


export default Register;
