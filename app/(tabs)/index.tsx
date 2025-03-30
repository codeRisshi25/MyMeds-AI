import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Clock, Pill } from 'lucide-react-native';

export default function HomeScreen() {
  const upcomingMedications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', time: '10:00 AM' },
    { id: 2, name: 'Ibuprofen', dosage: '400mg', time: '2:00 PM' },
    { id: 3, name: 'Vitamin D', dosage: '1000IU', time: '8:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Morning, John</Text>
      
      <View style={styles.todaySection}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <ScrollView style={styles.medicationList}>
          {upcomingMedications.map((med) => (
            <View key={med.id} style={styles.medicationCard}>
              <View style={styles.medicationInfo}>
                <Pill size={24} color="#0891b2" />
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={16} color="#666" />
                <Text style={styles.timeText}>{med.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Scan New Prescription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1a1a1a',
    marginTop: 60,
    marginBottom: 30,
  },
  todaySection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  medicationList: {
    flex: 1,
  },
  medicationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationDetails: {
    marginLeft: 12,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a1a1a',
  },
  medicationDosage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginTop: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#0891b2',
  },
  scanButton: {
    backgroundColor: '#0891b2',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});