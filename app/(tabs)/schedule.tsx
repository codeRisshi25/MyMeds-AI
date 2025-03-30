import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';

export default function ScheduleScreen() {
  const schedule = [
    {
      time: '08:00 AM',
      medications: [
        { name: 'Vitamin D', dosage: '1000IU', instructions: 'Take with food' },
      ],
    },
    {
      time: '10:00 AM',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', instructions: 'Take with water' },
        { name: 'Probiotic', dosage: '1 capsule', instructions: 'Take on empty stomach' },
      ],
    },
    {
      time: '02:00 PM',
      medications: [
        { name: 'Ibuprofen', dosage: '400mg', instructions: 'Take with food' },
      ],
    },
    {
      time: '08:00 PM',
      medications: [
        { name: 'Vitamin C', dosage: '500mg', instructions: 'Take with water' },
        { name: 'Zinc', dosage: '15mg', instructions: 'Take with food' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Schedule</Text>
      <ScrollView style={styles.scheduleList}>
        {schedule.map((timeSlot, index) => (
          <View key={index} style={styles.timeSlot}>
            <View style={styles.timeHeader}>
              <Clock size={20} color="#0891b2" />
              <Text style={styles.timeText}>{timeSlot.time}</Text>
            </View>
            <View style={styles.medicationsList}>
              {timeSlot.medications.map((med, medIndex) => (
                <View key={medIndex} style={styles.medicationItem}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage}</Text>
                  <Text style={styles.medicationInstructions}>{med.instructions}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1a1a1a',
    marginTop: 60,
    marginBottom: 30,
  },
  scheduleList: {
    flex: 1,
  },
  timeSlot: {
    marginBottom: 24,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#0891b2',
  },
  medicationsList: {
    gap: 12,
  },
  medicationItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  medicationInstructions: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#0891b2',
  },
});