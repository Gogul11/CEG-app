import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubjectCardProps {
  name: string;
  unattendedClasses: number;
  attendancePercent: number;
  absenceLimit: number;
  total_hrs: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  unattendedClasses,
  attendancePercent,
  absenceLimit,
  total_hrs,
}) => {
  const [unattended, setUnattended] = useState(unattendedClasses || 0);
  const [attendance, setAttendance] = useState(attendancePercent || 100);
  const [limit, setLimit] = useState(absenceLimit || Math.floor(total_hrs * 0.25));

  useEffect(() => {
    if (!name) {
      console.error('The name prop is undefined or empty.');
      return;
    }

    const loadAttendanceData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(name);
        if (storedData) {
          const { unattended, attendance, limit } = JSON.parse(storedData);
          setUnattended(unattended);
          setAttendance(attendance);
          setLimit(limit);
        } else {
          // Set the initial limit if not already stored
          const initialLimit = Math.floor(total_hrs * 0.25);
          setLimit(initialLimit);
        }
      } catch (error) {
        console.error('Error loading attendance data:', error);
      }
    };

    loadAttendanceData();
  }, [name]);

  const saveAttendanceData = async (newUnattended: number, newAttendance: number, newLimit: number) => {
    if (!name) {
      console.error('The name prop is undefined or empty.');
      return;
    }

    try {
      const data = {
        unattended: newUnattended,
        attendance: newAttendance,
        limit: newLimit,
      };
      await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving attendance data:', error);
    }
  };

  const handleIncrease = () => {
    if (unattended < total_hrs) {
      const newUnattended = unattended + 1;
      const newAttendance = ((total_hrs - newUnattended) / total_hrs) * 100;
      const newLimit = Math.floor(total_hrs * 0.25) - newUnattended;
      setUnattended(newUnattended);
      setAttendance(newAttendance);
      setLimit(newLimit);
      saveAttendanceData(newUnattended, newAttendance, newLimit);
    }
  };

  const handleDecrease = () => {
    if (unattended > 0) {
      const newUnattended = unattended - 1;
      const newAttendance = ((total_hrs - newUnattended) / total_hrs) * 100;
      const newLimit = Math.floor(total_hrs * 0.25) - newUnattended;
      setUnattended(newUnattended);
      setAttendance(newAttendance);
      setLimit(newLimit);
      saveAttendanceData(newUnattended, newAttendance, newLimit);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subjectName}>{name}</Text>
          <Text style={styles.infoText}>Classes Missed: {unattended}</Text>
          <Text style={styles.infoText}>Attendance: {attendance !== null ? attendance.toFixed(2) : 'N/A'}%</Text>
          <Text style={styles.infoText}>Skips Left: {limit}</Text>
        </View>
        <View style={styles.symbolContainer}>
          <TouchableOpacity onPress={handleDecrease}>
            <Text style={styles.symbolText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncrease}>
            <Text style={styles.symbolText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50, // Increased gap value
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  symbolText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default SubjectCard;