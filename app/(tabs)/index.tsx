import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSurah, setExpandedSurah] = useState(null); // For tracking which Surah is expanded

  // Fetch the data using useEffect
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the Surah click to toggle expansion
  const handleSurahClick = (surahNumber) => {
    if (expandedSurah === surahNumber) {
      setExpandedSurah(null); // Collapse if already expanded
    } else {
      setExpandedSurah(surahNumber); // Expand if collapsed
    }
  };

  // Render Surah details when expanded
  const renderSurahDetails = (surah) => {
    return (
      <View style={styles.surahDetails}>
        <Text>Revelation Type: {surah.revelationType}</Text>
        <Text>Number of Ayahs: {surah.numberOfAyahs}</Text>
        <Text>Surah Name (Arabic): {surah.name}</Text>
        {/* You can add more details here, like the Ayahs if needed */}
      </View>
    );
  };

  // Main content
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleSurahClick(item.number)} style={styles.surahItem}>
              <Text style={styles.surahName}>{item.number}. {item.englishName}</Text>
            </TouchableOpacity>
            {expandedSurah === item.number && renderSurahDetails(item)}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  surahItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  surahName: {
    fontSize: 18,
    color: '#333',
  },
  surahDetails: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
