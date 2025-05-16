import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios, { AxiosInstance } from 'axios';
import styles from '../styles/styles';
import backgroundImage from '../../assets/fundo1.png';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin: AxiosInstance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
});

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('gerente@mottu.teste');
  const [password, setPassword] = useState('qwerty123');
  const KEY_SUFIX = `key=${APIKEY}`;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.welcome}>BEM-VINDO(A)!</Text>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[styles.label, { marginTop: 20 }]}>SENHA</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const path = `:signInWithPassword?${KEY_SUFIX}`;
              apiLogin
                .post(path, { email, password, returnSecureToken: true })
                .then(() => {
                  ToastAndroid.show('Usuário logado com sucesso', ToastAndroid.LONG);
                  navigation.replace('PatioCode');
                })
                .catch(() => {
                  ToastAndroid.show('Erro ao logar o usuário', ToastAndroid.LONG);
                });
            }}
          >
            <Text style={styles.buttonText}>FAZER LOGIN</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen; 