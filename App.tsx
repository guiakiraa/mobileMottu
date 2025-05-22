import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, Triagem } from './src/types/types';

// Importação das telas
import LoginScreen from './src/screens/LoginScreen';
import PatioCodeScreen from './src/screens/PatioCodeScreen';
import MenuScreen from './src/screens/MenuScreen';
import VerMotosScreen from './src/screens/VerMotosScreen';
import ListaTriagensScreen from './src/screens/ListaTriagensScreen';
import LocalizarMotoScreen from './src/screens/LocalizarMotoScreen';
import DetalheMotoScreen from './src/screens/DetalheMotoScreen';
import FazerTriagemScreen from './src/screens/FazerTriagemScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [triagens, setTriagens] = useState<Triagem[]>([]);

  useEffect(() => {
    const carregarTriagens = async () => {
      try {
        const data = await AsyncStorage.getItem('triagens');
        if (data) setTriagens(JSON.parse(data));
      } catch (e) {
        console.error('Erro ao carregar triagens:', e);
      }
    };
    carregarTriagens();
  }, []);

  useEffect(() => {
    const salvarTriagens = async () => {
      try {
        await AsyncStorage.setItem('triagens', JSON.stringify(triagens));
      } catch (e) {
        console.error('Erro ao salvar triagens:', e);
      }
    };
    salvarTriagens();
  }, [triagens]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatioCode" component={PatioCodeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="VerMotos">
          {(props) => <VerMotosScreen {...props} triagens={triagens} />}
        </Stack.Screen>
        <Stack.Screen name="CadastrarMoto">
          {(props) => <FazerTriagemScreen {...props} triagens={triagens} setTriagens={setTriagens} />}
        </Stack.Screen>
        <Stack.Screen name="ListaTriagens">
          {(props) => <ListaTriagensScreen {...props} triagens={triagens} setTriagens={setTriagens} />}
        </Stack.Screen>
        <Stack.Screen name="LocalizarMoto">
          {(props) => <LocalizarMotoScreen {...props} triagens={triagens} />}
        </Stack.Screen>
        <Stack.Screen name="DetalheMoto" component={DetalheMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}