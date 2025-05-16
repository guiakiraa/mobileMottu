import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import { TriagemType } from '../types/TriagemType';

interface Props {
  navigation: any;
  triagens: TriagemType[];
}

const VerMotosScreen: React.FC<Props> = ({ navigation, triagens }) => {
  const [setor, setSetor] = useState<string>('patio_a');

  const buscarTriagens = () => {
    navigation.navigate('ListaTriagens', { setor });
  };

  return (
    <View style={styles.menuComponentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Ver Motos do Pátio</Text>
      <Text style={[styles.menuComponentText, { fontSize: 16, marginBottom: 10 }]}>Selecione o setor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={setor}
          onValueChange={(itemValue: string) => setSetor(itemValue)}
          style={styles.picker}
          dropdownIconColor="#57E957"
        >
          <Picker.Item label="Pátio A" value="patio_a" color="#222" />
          <Picker.Item label="Pátio B" value="patio_b" color="#222" />
          <Picker.Item label="Manutenção" value="manutencao" color="#222" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.menuBackButton} onPress={buscarTriagens}>
        <Text style={styles.menuBackButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerMotosScreen; 