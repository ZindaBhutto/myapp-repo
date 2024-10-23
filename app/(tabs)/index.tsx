import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

type Ayah = {
  number: number;
  text: string;
};

const App = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);
  const [ayahLoading, setAyahLoading] = useState<boolean>(false);

  // Fetch Surahs
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  // Fetch Ayahs for a selected Surah
  const fetchAyahs = async (surahNumber: number) => {
    setAyahLoading(true);
    try {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      setAyahs(response.data.data.ayahs);
    } catch (error) {
      console.error("Error fetching ayahs", error);
    } finally {
      setAyahLoading(false);
    }
  };

  const handleSurahPress = (surahNumber: number) => {
    if (selectedSurah === surahNumber) {
      // If the surah is already selected, deselect it
      setSelectedSurah(null);
      setAyahs(null);
    } else {
      // Set selected surah and fetch ayahs
      setSelectedSurah(surahNumber);
      fetchAyahs(surahNumber);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quran App</Text>
      </View>

      <View style={styles.surahListContainer}>
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={[
                  styles.surahCard,
                  selectedSurah === item.number && styles.selectedSurahCard, // Widen the selected surah
                ]}
                onPress={() => handleSurahPress(item.number)}
              >
                <View style={styles.surahHeader}>
                  <Text style={styles.surahNumber}>{item.number}</Text>
                  <Text style={styles.surahEnglishName}>
                    {item.englishName}
                  </Text>
                  <Text style={styles.surahArabicName}>{item.name}</Text>
                </View>
              </TouchableOpacity>

              {/* Display Ayahs if this Surah is selected */}
              {selectedSurah === item.number && (
                <View style={styles.ayahContainer}>
                  {ayahLoading ? (
                    <ActivityIndicator size="small" color="#6200ee" />
                  ) : (
                    ayahs?.map((ayah) => (
                      <Text key={ayah.number} style={styles.ayahText}>
                        {ayah.number}. {ayah.text}
                      </Text>
                    ))
                  )}
                </View>
              )}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#6200ee",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  surahListContainer: {
    padding: 10,
  },
  surahCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    elevation: 2,
  },
  selectedSurahCard: {
    padding: 30, // Widen the card when selected
  },
  surahHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surahNumber: {
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "bold",
  },
  surahEnglishName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  surahArabicName: {
    fontSize: 18,
    color: "#6200ee",
  },
  ayahContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  ayahText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default App;
