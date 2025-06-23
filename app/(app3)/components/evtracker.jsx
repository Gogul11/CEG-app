import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EVVehicle from './EV';
import { useFocusEffect } from 'expo-router';

const EVTrackingScreen = () => {
  const [seats, setSeats] = useState([
    [true, false, true, false],
    [false, true, false, true],
    [true, false, true, false],
    [true, false] // Last row with 2 seats (driver included)
  ]);

  const[load, setLoad] = useState(false)

  useFocusEffect(useCallback(() => {
    setLoad(false)
    const timer = setTimeout(() => setLoad(false), 4000)

    return () => clearTimeout(timer)
  },[]))

  const[ev, setEv] = useState(true)

  return (
    <SafeAreaView className='flex-1 bg-white'>
        {load ? 
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
            {/* Heading */}
            <Text style={styles.heading}>EV Tracking</Text>
            
            {/* Layout Container */}
            <View style={styles.layoutContainer}>
            {/* Progress Indicator (Left Side) */}
                <View style={styles.progressColumn}>
                    {['Stop1', 'Stop2', 'Stop3', 'Stop4', 'Stop5'].map((stop, index) => (
                    <View key={index} style={styles.progressItem}>
                        <View style={styles.progressCircleContainer}>
                        {index > 0 && <View style={styles.progressConnectorExtended} />} 
                        <View style={[styles.concentricCircle, { borderColor: ev ? '#4ade80' : 'red' }]}> 
                            <View style={styles.innerCircle}>
                            <Text style={styles.progressText}>{stop}</Text>
                            </View>
                        </View>
                        </View>
                    </View>
                    ))}
                </View>

            {/* Seat Layout */}
                <View style={styles.seatLayout}>
                    {seats.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((occupied, seatIndex) => (
                        <TouchableOpacity key={seatIndex} style={[styles.seat, occupied ? styles.occupied : styles.unoccupied]}>
                            <Text style={styles.seatText}>{occupied ? 'X' : 'O'}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                    ))}
                </View>

                    
            </View>

            <View className='flex flex-row gap-[30px] justify-center m-4'>
                <View className='flex flex-row justify-center items-center'>
                    <TouchableOpacity style={[styles.seat, styles.occupied]}>
                            <Text style={styles.seatText}>{'X'}</Text>
                    </TouchableOpacity>
                    <Text>Occupied</Text>
                </View>
                <View className='flex flex-row items-center'>
                    <TouchableOpacity style={[styles.seat, styles.unoccupied]}>
                            <Text style={styles.seatText}>{'O'}</Text>
                    </TouchableOpacity>
                    <Text>Unoccupied</Text>
                </View>
            </View>
        </View>
        </ScrollView>
        :<EVVehicle/>}
    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  layoutContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  progressColumn: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    justifyContent : 'center'
  },
  progressItem: {
    alignItems: 'center',
  },
  progressCircleContainer: {
    alignItems: 'center',
  },
  concentricCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  progressConnectorExtended: {
    width: 4,
    height: 50,
    backgroundColor: '#555',
    marginBottom: 5,
  },
  car: {
    width: 60,
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 15,
    position: 'absolute',
    left: -30,
  },
  seatLayout: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  occupied: {
    backgroundColor: 'red',
    opacity:0.6
  },
  unoccupied: {
    backgroundColor: '#4ade80',
    opacity : 1
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EVTrackingScreen;