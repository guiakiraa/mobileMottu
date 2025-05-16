import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo3 from '../../assets/fundo3.png';
import Icon from 'react-native-vector-icons/Feather';
import { TriagemType } from '../types/TriagemType';

interface Props {
  navigation: any;
  triagens: TriagemType[];
}

const LocalizarMotoScreen: React.FC<Props> = ({ navigation, triagens }) => {
  const [placa, setPlaca] = useState('');

  return (
    <ImageBackground source={fundo3} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
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
          const found = triagens.find((t: TriagemType) => t.placa.toLowerCase() === placa.trim().toLowerCase());
          navigation.navigate('DetalheMoto', { triagem: found || null });
        }}
      >
        <Text style={styles.menuBackButtonText}>Buscar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LocalizarMotoScreen; 