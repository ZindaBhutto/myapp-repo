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
import { MaterialIcons } from "@expo/vector-icons"; // For icons

// Surah and Ayah interfaces
interface SurahResponse {
  data: Surah[];
}

interface Surah {
  number: number;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface AyahResponse {
  data: {
    ayahs: Ayah[]; // Correctly nesting ayahs under data
  };
}

interface Ayah {
  number: number;
  text: string;
}

// Header component
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="#6200ee" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quran App</Text>
      </View>
    </View>
  );
};

// Last Read Card component
const LastReadCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.greeting}>Asslamualaikum</Text>
      <Text style={styles.userName}>Tanvir Ahassan</Text>

      <View style={styles.lastReadCard}>
        <MaterialIcons name="book" size={28} color="#fff" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Last Read</Text>
          <Text style={styles.cardSubtitle}>Al-Fatiah</Text>
          <Text style={styles.cardAyah}>Ayah No: 1</Text>
        </View>
      </View>
    </View>
  );
};

// Main App component
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
        const response = await axios.get<SurahResponse>(
          "https://api.alquran.cloud/v1/surah"
        );
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
      const response = await axios.get<AyahResponse>(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      setAyahs(response.data.data.ayahs); // Accessing ayahs correctly under response.data.data
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
      <Header />
      <LastReadCard />

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
                <View style={styles.surahInfo}>
                  <Text style={styles.surahEnglishName}>
                    {item.englishName}
                  </Text>
                  <Text style={styles.surahTranslation}>
                    {item.englishNameTranslation}
                  </Text>
                </View>
                <Text style={styles.revelationType}>{item.revelationType}</Text>
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
  headerContainer: {
    backgroundColor: "#6200ee",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    color: "#333",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  lastReadCard: {
    backgroundColor: "#b388ff",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTextContainer: {
    marginLeft: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  cardAyah: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
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
  surahInfo: {
    flexDirection: "column",
  },
  surahEnglishName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  surahTranslation: {
    fontSize: 14,
    color: "#999",
  },
  revelationType: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
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
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tab: {
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "bold",
  },
});

export default App;
