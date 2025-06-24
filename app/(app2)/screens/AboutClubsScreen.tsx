import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Types
type RootStackParamList = {
  ClubDetails: { club: ClubItem };
};

type AboutClubsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ClubItem {
  id: string;
  name: string;
  description: string;
  image: any;
  website: string;
  email: string;
  insta:string;
}

interface AboutClubsScreenProps {
  navigation: AboutClubsScreenNavigationProp;
}

const clubs: ClubItem[] = [
  { id: '14', name: 'ACM', description: 'Coding.', image: require('../assets/images/acm.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '7', name: 'ASTRO', description: 'Sci-fi.', image: require('../assets/images/astro.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '10', name: 'AU PODIUM', description: 'English.', image: require('../assets/images/aupodium.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '13', name: 'AUSEC', description: 'Entrepreneur.', image: require('../assets/images/ausec.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '1', name: 'CTF', description: 'Tech Club.', image: require('../assets/images/ctf.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/ceg_tech_forum?igsh=amdnMjhiaHh5aW0=' },
  { id: '15', name: 'CSAU', description: 'Coding.', image: require('../assets/images/csau.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '11', name: 'GT', description: 'Photography.', image: require('../assets/images/gt.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '3', name: 'LEO', description: 'Service based club.', image: require('../assets/images/leo.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/leoclubofceg?igsh=NHpzODBxMXN2czBy' },
  { id: '12', name: 'LIT', description: 'English.', image: require('../assets/images/lit.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '8', name: 'MADHAVAVAM', description: 'Tamil development.', image: require('../assets/images/madhavam.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '4', name: 'PIXELS', description: 'Photography.', image: require('../assets/images/pixels.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '18', name: 'ROBOTICS', description: 'Tech projects.', image: require('../assets/images/robotics.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '16', name: 'ROTRACT', description: 'Service based.', image: require('../assets/images/rotract.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '2', name: 'SAAS', description: 'Non-Tech.', image: require('../assets/images/saas.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '5', name: 'SAPTHAM', description: 'Musical and Dance.', image: require('../assets/images/saptham.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '9', name: 'SPARTANZ', description: 'Dance.', image: require('../assets/images/spartanz.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '20', name: 'SIRUTHULI', description: 'Sports and fitness.', image: require('../assets/images/siruthuli.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '6', name: 'SRUTHILAIYA', description: 'Singing.', image: require('../assets/images/sruthilaya.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' },
  { id: '19', name: 'THEATERON', description: 'Stage arts.', image: require('../assets/images/theatron.png'), website: 'https://www.google.com', email: 'ctf123@gmail.com', insta: 'https://www.instagram.com/saas_ceg?igsh=MWpjaXI0Y2xtaWVzMA==' }
];


const AboutClubsScreen: React.FC<AboutClubsScreenProps> = ({ navigation }) => {
  const animatedValues = useRef(clubs.map(() => new Animated.Value(0))).current;

  // Animate the club card when it is rendered
  useEffect(() => {
    Animated.stagger(150, // stagger each animation by 150ms
      animatedValues.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const renderClubItem = ({ item, index }: { item: ClubItem, index: number }) => {
    return (
      <TouchableOpacity
        style={styles.clubCard}
        onPress={() => navigation.navigate("Club Details", { club: item })}
        activeOpacity={0.7}
      >
        {/* Animated View for the Club Item */}
        <Animated.View style={[styles.clubImageWrapper, { opacity: animatedValues[index], transform: [{ scale: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }] }]}>
          <Image 
            source={item.image} 
            style={styles.clubImage}
            resizeMode="cover"
          />
        </Animated.View>

        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubDescription}>
          {item.description.split(".")[0]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient 
      colors={["#4A90E2", "#9013FE"]} 
      style={styles.container}
    >
      <Text style={styles.headerText}>
        Clubs of CEG
      </Text>

      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id}
        renderItem={renderClubItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
 
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clubCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: CARD_WIDTH,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  clubImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginBottom: 12,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937', // gray-800
    marginBottom: 4,
  },
  clubDescription: {
    fontSize: 14,
    color: '#6B7280', // gray-500
    textAlign: 'center',
  },
});

export default AboutClubsScreen;