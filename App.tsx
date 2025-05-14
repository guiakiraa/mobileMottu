import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import backgroundImage from './assets/fundo1.png';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin: AxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts"
});

export default function App() {
  const [email, setEmail] = useState("maria@teste.com");
  const [password, setPassword] = useState("abc123");
  const [token, setToken] = useState<string | undefined>(undefined);
  const KEY_SUFIX = `key=${APIKEY}`;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {token ? (
          <View style={styles.loggedContainer}>
            <Text style={styles.success}>Aplicação acessada com sucesso</Text>
            <Text style={styles.success}>Você está logado</Text>
            <Text style={styles.success}>Token: {token}</Text>
            <Button title="Logout" onPress={() => setToken(undefined)} />
          </View>
        ) : (
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
                console.log(`Acessando: ${path}`);
                apiLogin
                  .post(path, { email, password, returnSecureToken: true })
                  .then((info: AxiosResponse) => {
                    setToken(info.data.idToken);
                    ToastAndroid.show("Usuário logado com sucesso", ToastAndroid.LONG);
                  })
                  .catch((err: any) => {
                    console.log(JSON.stringify(err));
                    ToastAndroid.show("Erro ao logar o usuário", ToastAndroid.LONG);
                  });
              }}
            >
              <Text style={styles.buttonText}>FAZER LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00ff00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  success: {
    color: '#fff',
    marginBottom: 10,
  },
  loggedContainer: {
    alignItems: 'center',
  }
});
