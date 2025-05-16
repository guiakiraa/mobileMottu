import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo5 from '../../assets/fundo5.png';
import Icon from 'react-native-vector-icons/Feather';
import { TriagemType } from '../types/TriagemType';

interface Props {
  route: any;
  navigation: any;
}

const DetalheMotoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { triagem } = route.params as { triagem: TriagemType | null };
  return (
    <ImageBackground source={fundo5} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Detalhes da Moto</Text>
      {triagem ? (
        <View style={{ backgroundColor: '#222', borderRadius: 8, padding: 12, marginTop: 20, borderColor: '#57E957', borderWidth: 1 }}>
          <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Placa: <Text style={{ color: '#fff' }}>{triagem.placa}</Text></Text>
          <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Diagnóstico: <Text style={{ color: '#fff' }}>{triagem.diagnostico}</Text></Text>
          <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Setor: <Text style={{ color: '#fff' }}>{triagem.setor === 'patio_a' ? 'Pátio A' : triagem.setor === 'patio_b' ? 'Pátio B' : 'Manutenção'}</Text></Text>
        </View>
      ) : (
        <Text style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>Moto não encontrada.</Text>
      )}
    </ImageBackground>
  );
};

export default DetalheMotoScreen; 