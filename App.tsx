import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import backgroundImage from './assets/fundo1.png';
import fundo2 from './assets/fundo2.png';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin: AxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts"
});

const Stack = createStackNavigator();

function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("gerente@mottu.teste");
  const [password, setPassword] = useState("qwerty123");
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
                  ToastAndroid.show("Usuário logado com sucesso", ToastAndroid.LONG);
                  navigation.replace('PatioCode');
                })
                .catch(() => {
                  ToastAndroid.show("Erro ao logar o usuário", ToastAndroid.LONG);
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
}

function PatioCodeScreen({ navigation }: any) {
  const [patioCode, setPatioCode] = useState('');
  return (
    <ImageBackground source={fundo2} style={styles.background}>
      <View style={styles.patioContainer}>
        <Text style={styles.patioTitle}>INSIRA O CÓDIGO DO PÁTIO</Text>
        <TextInput
          style={styles.patioCodeInputSingle}
          value={patioCode}
          onChangeText={v => setPatioCode(v.toUpperCase())}
          placeholder="XYZ-357"
          placeholderTextColor="#222"
          maxLength={7}
          autoCapitalize="characters"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.patioButton} onPress={() => navigation.replace('Menu')}>
          <Text style={styles.patioButtonText}>CONCLUIR</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

function MenuScreen({ navigation }: any) {
  return (
    <ImageBackground source={fundo2} style={styles.background}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButtonDefault}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('VerMotos')}
        >
          <Text style={styles.menuButtonDefaultText}>
            VER MOTOS DO PÁTIO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButtonDefault}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('CadastrarMoto')}
        >
          <Text style={styles.menuButtonDefaultText}>
            CADASTRAR{"\n"}MOTO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButtonDefault}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('LocalizarMoto')}
        >
          <Text style={styles.menuButtonDefaultText}>
            LOCALIZAR{"\n"}MOTO
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

function VerMotosScreen({ navigation }: any) {
  return (
    <View style={styles.menuComponentContainer}>
      <Text style={styles.menuComponentText}>Tela: Ver Motos do Pátio</Text>
      <TouchableOpacity style={styles.menuBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.menuBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function CadastrarMotoScreen({ navigation }: any) {
  return (
    <View style={styles.menuComponentContainer}>
      <Text style={styles.menuComponentText}>Tela: Cadastrar Moto</Text>
      <TouchableOpacity style={styles.menuBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.menuBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function LocalizarMotoScreen({ navigation }: any) {
  return (
    <View style={styles.menuComponentContainer}>
      <Text style={styles.menuComponentText}>Tela: Localizar Moto</Text>
      <TouchableOpacity style={styles.menuBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.menuBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatioCode" component={PatioCodeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="VerMotos" component={VerMotosScreen} />
        <Stack.Screen name="CadastrarMoto" component={CadastrarMotoScreen} />
        <Stack.Screen name="LocalizarMoto" component={LocalizarMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  patioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  patioTitle: {
    color: '#C6F6D5',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 30,
    marginTop: -60,
    textAlign: 'center',
  },
  patioCodeInputSingle: {
    width: 160,
    height: 50,
    backgroundColor: '#7ED957',
    borderRadius: 8,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 24,
    color: '#222',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    elevation: 2,
    letterSpacing: 6,
  },
  patioButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    elevation: 2,
  },
  patioButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  menuButtonDefault: {
    width: 200,
    height: 100,
    borderWidth: 1.5,
    borderColor: '#57E957',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#000',
  },
  menuButtonDefaultText: {
    color: '#57E957',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  menuComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuComponentText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuBackButton: {
    backgroundColor: '#57E957',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  menuBackButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
