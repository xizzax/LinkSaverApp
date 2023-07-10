import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import Btn from './login_btn';
import icon from './srcs/l_icon.png';
import globalstyles from './styles/style_global';
import {disableNetwork} from 'firebase/firestore';
import AuthForm from './signin_form';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/link_manager';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const auth = getAuth();
  const navigation = useNavigation();
  const user = useSelector(state => state.links.user);
  const dispatch = useDispatch();

  //logging in existing user
  const SignInExistingUser = (email, password) => {
    //firebase authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        dispatch(setUser(userCredential.user.email));
        console.log('Logged In!');

        //navigating to homepage
        navigation.navigate('HomePage');
      })
      .catch(error => {
        e;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <View style={styles.mainView}>
      <View>
        <View style={styles.imageview}>
          <Image source={icon} />
        </View>
        <Text style={styles.header}>Welcome to Izza's Linktree Clone!</Text>
      </View>
      <View style={styles.inputView}>
        <AuthForm btnTitle={'Login'} formAuthHandler={SignInExistingUser} />

        <View style={styles.buttonView}>
          <Btn
            title="Sign Up Instead"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
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
    padding: 30,
    paddingTop: 60,
    // margin: 10,
    // marginTop: 45,
    // justifyContent: 'space-between',
    // alignItems: 'stretch',
    backgroundColor: '#ddd',
    height: '100%',
  },
  headerView: {
    margin: 20,
    // flex: 0.35,
  },
  inputView: {
    // marginTop: 10,
  },
  imageview: {
    alignItems: 'center',
    paddingTop: 20,
    // marginTop: 10,
  },
  login_text: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    paddingBottom: 50,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    // marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  buttonView: {
    // marginTop: 10,
  },
  textinputs: {
    borderColor: '#eee',
    borderWidth: 1,
    // margin: 10,
    padding: 10,
    // height: 45,
    borderRadius: 4,
    fontSize: 18,
  },
});
