import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import globalstyles from './styles/style_global';
import {Formik} from 'formik';
import * as yup from 'yup';

const linkSchema = yup.object({
  name: yup.string().required(),
  link: yup.string().url().required()
});

export default function AddLinkForm({addLink}) {
  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        initialValues={{name: '', link: ''}}
        validationSchema={linkSchema}
        onSubmit={(values, actions) => {
          addLink(values);
          actions.resetForm();
          ToastAndroid.show('submitted', ToastAndroid.LONG);
          console.log(values);
        }}>
        {formikprops => (
          <View>
            <TextInput
              style={globalstyles.textinputs}
              placeholder="Name"
              placeholderTextColor={'#777'}
              onChangeText={formikprops.handleChange('name')}
              value={formikprops.values.name}
            />

            <TextInput
              style={globalstyles.textinputs}
              placeholder="Link"
              placeholderTextColor={'#777'}
              onChangeText={formikprops.handleChange('link')}
              value={formikprops.values.link}
            />

            <Button
              title="Save Link"
              color="black"
              onPress={formikprops.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: 'center',
    // flexDirection: "column",
    // alignItems: 'center',
    // flex: 1
  },
  form: {},
});
