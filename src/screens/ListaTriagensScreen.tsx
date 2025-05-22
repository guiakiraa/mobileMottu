import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, RefreshControl } from 'react-native';
import styles from '../styles/styles';
import fundo6 from '../../assets/fundo6.png';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListaTriagensProps, Triagem } from '../types/types';

function ListaTriagensScreen(props: ListaTriagensProps): React.ReactElement {
  const { route, navigation, triagens, setTriagens } = props;
  const { setor } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const resultados = triagens.filter((t: Triagem) => t.setor === setor);

  const atualizarLista = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await AsyncStorage.getItem('triagens');
      if (data) setTriagens(JSON.parse(data));
    } catch (e) {
      // erro ao carregar
    } finally {
      setRefreshing(false);
    }
  }, [setTriagens]);

  const renderItem = ({ item }: { item: Triagem }) => (
    <View style={{ backgroundColor: '#222', borderRadius: 8, padding: 12, marginBottom: 12, borderColor: '#57E957', borderWidth: 1 }}>
      <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Placa: <Text style={{ color: '#fff' }}>{item.placa}</Text></Text>
      <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Diagnóstico: <Text style={{ color: '#fff' }}>{item.diagnostico}</Text></Text>
      <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Setor: <Text style={{ color: '#fff' }}>{item.setor === 'patio_a' ? 'Pátio A' : item.setor === 'patio_b' ? 'Pátio B' : 'Manutenção'}</Text></Text>
    </View>
  );

  const ListEmptyComponent = () => (
    <Text style={{ color: '#fff', textAlign: 'center' }}>Nenhuma triagem encontrada para este setor.</Text>
  );

  return (
    <ImageBackground source={fundo6} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Triagens do setor {setor === 'patio_a' ? 'Pátio A' : setor === 'patio_b' ? 'Pátio B' : 'Manutenção'}</Text>
      <FlatList
        data={resultados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarLista}
            colors={['#57E957']}
            tintColor="#57E957"
          />
        }
      />
    </ImageBackground>
  );
}

export default ListaTriagensScreen; 