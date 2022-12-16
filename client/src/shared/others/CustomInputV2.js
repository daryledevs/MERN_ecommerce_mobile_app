import React from 'react';
import { useEffect } from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';

const CustomInput = props => {
  
  const {
    textInputRef,
    cardDate,
    isCardNumber,
    maxLength,
    customStyle,
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  useEffect(() => { 
    if(cardDate){
      let sliced_month = value.slice(0, 2);
      let sliced_year = value.slice(3, 5);
      let year = `${new Date().getFullYear()}`.slice(2, 4);
      if (sliced_month > 12) onChange(name)(value.replace(sliced_month, '12'));
      if (sliced_year > year) onChange(name)(value.replace(sliced_year, year));
    }
  }, [value]);

  function cardNumberFormatter(oldValue, newValue) {
    if (oldValue.length > newValue.length) {
      onChange(name)(newValue);
      return;
    }

    onChange(name)(
      newValue
        .replace(/\W/gi, '')
        .replace(/(.{4})/g, '$1 ')
        .substring(0, 19),
    );
    return 
  };


  function expirationDateFormatter(
    oldValue,
    newValue,
  ) {
    if (oldValue.length > newValue.length) {
      onChange(name)(newValue);
      return;
    }

    onChange(name)(
      newValue
        .replace(/\W/gi, '')
        .replace(/(.{2})/g, '$1/')
        .substring(0, 5),
    );

    return ;
  };
  
  return (
    // {margin: 10} is just a placeholder, for future modification
    <View style={customStyle ? customStyle : {margin: 10}}>
      <TextInput
        ref={textInputRef}
        maxLength={maxLength}
        style={[
          styles.textInput,
          props.multiline && {
            height: props.numberOfLines * 40,
            textAlignVertical: 'top',
          },
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={text => {
          if (isCardNumber) cardNumberFormatter(value, text);
          if (cardDate) expirationDateFormatter(value, text);
          if (!isCardNumber && !cardDate) onChange(name)(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      <Text style={styles.errorText}>{hasError && errors[name]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
