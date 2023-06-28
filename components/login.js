import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import Btn from './login_btn';
import icon from './srcs/l_icon.png';
import globalstyles from './styles/style_global';
import {disableNetwork} from 'firebase/firestore';

function Login({navigation}) {
  return (
    <View style={styles.mainView}>
      <View>
        <View style={styles.imageview}>
          <Image source={icon} />
        </View>
        <Text style={styles.header}>Welcome to Izza's Linktree Clone!</Text>
      </View>
      <View style={styles.inputView}>
        {/* <Text style={styles.login_text}>Login</Text> */}
        <TextInput
          style={styles.textinputs}
          placeholder="Username"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.textinputs}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry={true}
          password={true}
        />
        <View style={styles.buttonView}>
          <Btn title="Login" />
          <Btn title="Sign Up Instead" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    marginTop: 45,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  headerView: {
    margin: 10,
    flex: 0.35,
  },
  inputView: {
    marginTop: 10,
  },
  imageview: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  login_text: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  buttonView:{
    marginTop:10
  },
  textinputs: {
    borderColor: '#777',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    height: 45,
    borderRadius: 4,
    fontSize: 18,
  },
});
