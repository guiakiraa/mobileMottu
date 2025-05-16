import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo6 from '../../assets/fundo6.png';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TriagemType } from '../types/TriagemType';

interface Props {
  route: any;
  navigation: any;
  triagens: TriagemType[];
  setTriagens: (t: TriagemType[]) => void;
}

const ListaTriagensScreen: React.FC<Props> = ({ route, navigation, triagens, setTriagens }) => {
  const { setor } = route.params;
  const resultados = triagens.filter((t: TriagemType) => t.setor === setor);

  const atualizarLista = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('triagens');
      if (data) setTriagens(JSON.parse(data));
    } catch (e) {
      // erro ao carregar
    }
  }, [setTriagens]);

  return (
    <ImageBackground source={fundo6} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuBackButton} onPress={atualizarLista}>
        <Text style={styles.menuBackButtonText}>Atualizar lista</Text>
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Triagens do setor {setor === 'patio_a' ? 'Pátio A' : setor === 'patio_b' ? 'Pátio B' : 'Manutenção'}</Text>
      <View style={{ width: '100%', marginTop: 24 }}>
        {resultados.length === 0 ? (
          <Text style={{ color: '#fff', textAlign: 'center' }}>Nenhuma triagem encontrada para este setor.</Text>
        ) : (
          resultados.map((t: TriagemType) => (
            <View key={t.id} style={{ backgroundColor: '#222', borderRadius: 8, padding: 12, marginBottom: 12, borderColor: '#57E957', borderWidth: 1 }}>
              <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Placa: <Text style={{ color: '#fff' }}>{t.placa}</Text></Text>
              <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Diagnóstico: <Text style={{ color: '#fff' }}>{t.diagnostico}</Text></Text>
              <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Setor: <Text style={{ color: '#fff' }}>{t.setor === 'patio_a' ? 'Pátio A' : t.setor === 'patio_b' ? 'Pátio B' : 'Manutenção'}</Text></Text>
            </View>
          ))
        )}
      </View>
    </ImageBackground>
  );
};

export default ListaTriagensScreen; 