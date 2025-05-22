import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo3 from '../../assets/fundo3.png';
import { Feather } from '@expo/vector-icons';
import { LocalizarMotoProps, Triagem } from '../types/types';

function LocalizarMotoScreen(props: LocalizarMotoProps): React.ReactElement {
  const { navigation, triagens } = props;
  const [placa, setPlaca] = useState('');

  return (
    <ImageBackground source={fundo3} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Localizar Moto</Text>
      <Text style={[styles.menuComponentText, { fontSize: 16, marginBottom: 10 }]}>Informe a placa</Text>
      <TextInput
        value={placa}
        placeholder='Placa'
        placeholderTextColor="#aaa"
        onChangeText={setPlaca}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.menuBackButton}
        onPress={() => {
          const found = triagens.find((t: Triagem) => t.placa.toLowerCase() === placa.trim().toLowerCase());
          navigation.navigate('DetalheMoto', { triagem: found || null });
        }}
      >
        <Text style={styles.menuBackButtonText}>Buscar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default LocalizarMotoScreen; 