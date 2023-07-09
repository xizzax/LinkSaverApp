import { useSelector } from "react-redux";
import SplashScreen from "./splash_screen";
import Homepage from "./homepage";
import { Alert, Text, View , Button} from "react-native";
import SignUp from "./signup";
import Login from "./login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WrapperComponent(){
    // store data function
    const storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'key_1',
                'kim mingyu'
            )
            Alert.alert("Data Stored Successfully")
        } catch (e) {
            // saving error
            Alert.alert("Data Stored Failed")
        }
    }
    // get data function

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('key_1')
            if(value !== null) {
                // value previously stored
                Alert.alert(value)
            }
        } catch(e) {
            // error reading value
            Alert.alert("Failed to fetch the data")
        }
    }
    
    return(
        <View style={{flex:1}}>
            <Text> WrapperComponent </Text>
            {/* add a button to store data in async storage */}
            <Button title="Store Data" onPress={storeData} />
<Button title="Get Data" onPress={getData} />
        </View>
    );

}