import {StyleSheet, TextInput, View, Text, Image, ToastAndroid} from 'react-native';
import Btn from './login_btn';
import icon from './srcs/l_icon.png';
import globalstyles from './styles/style_global';
import {disableNetwork, doc, setDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import AuthForm from './signin_form';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/link_manager';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import {app} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';


function SignUp() {
  const auth = getAuth();
  const navigation = useNavigation();
  const user = useSelector(state => state.links.user);
  const dispatch = useDispatch();

  //creating a new account
  const CreateNewAccount = (email, password) => {
    async () => await setPersistence(auth, browserLocalPersistence);
    //using firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log("Account Created!");
      dispatch(setUser(userCredential.user.email));
      //making a new document in firestore for the user
      const db = getFirestore(app);
      await setDoc(doc(db, "users", userCredential.user.email), {
        email: userCredential.user.email,
        links: []
      });
      //logging in and navigating to homepage
      navigation.navigate("HomePage");
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }
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
     <AuthForm 
     btnTitle={"Sign Up"}
     formAuthHandler={CreateNewAccount}/>
      <View style={styles.buttonView}>
        <Btn title="Login Instead" onPress={() => {navigation.navigate("Login")}} />
      </View>
    </View>
  </View>
    );
}
export default SignUp;

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
