import {Formik} from 'formik';
import {View, Button, StyleSheet, Alert} from 'react-native';
import Btn from './login_btn';
import {TextInput} from 'react-native-paper';
export default function AuthForm({formAuthHandler, btnTitle}) {
  return (
    <View>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values, actions) => {
          if (values.email === '' || values.password === '') {
            Alert.alert('Please fill in all fields');
            return;
          }
          formAuthHandler(values.email, values.password);
          actions.resetForm();
        }}>
        {formikprops => (
          <View>
            <TextInput
              mode="outlined"
              label="Email Address"
              value={formikprops.values.email}
              onChangeText={formikprops.handleChange('email')}
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              activeOutlineColor="grey"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={formikprops.values.password}
              onChangeText={formikprops.handleChange('password')}
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              secureTextEntry={true}
              activeOutlineColor="grey"
            />

            <Btn title={btnTitle} onPress={formikprops.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

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
  buttonView: {
    marginTop: 10,
  },
  textinputs: {
    borderColor: '#777',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    height: 45,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
