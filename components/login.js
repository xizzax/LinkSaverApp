import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import Btn from "./login_btn";
import icon from "./srcs/l_icon.png";
import globalstyles from "./styles/style_global";

function Login() {
  return (
    <View>
      <View>
        <View style={styles.imageview}>
          <Image source={icon} />
        </View>
        <Text style={globalstyles.header}>Welcome to Izza's Linktree Clone!</Text>
      </View>
      <View>
        {/* <Text style={styles.login_text}>Login</Text> */}
        <TextInput
          style={globalstyles.textinputs}
          placeholder="Username"
          placeholderTextColor="#555"
        />
        <TextInput
          style={globalstyles.textinputs}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry={true}
          password={true}
        />
        <Btn title="Login" />
        <Btn title="Sign Up" onPress={()=>{}}/>
      </View>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  imageview: {
    alignItems: "center",
  },
  login_text: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
