import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [results, setResults] = useState({});

  // Generate time slots from 8:30 AM to 6:00 PM with 30-min intervals
  const generateTimeSlots = () => {
    const slots = [];
    let time = new Date();
    time.setHours(8, 30, 0);
    const endTime = new Date();
    endTime.setHours(18, 0, 0);

    while (time <= endTime) {
      slots.push(time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
      time = new Date(time.getTime() + 30 * 60000);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const couponA = Array.from({ length: 20 }, (_, i) => `A-${i + 1}`);
  const couponB = Array.from({ length: 20 }, (_, i) => `B-${i + 1}`);

  const handleLogin = () => {
    if (password === 'paisa@08') {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleResultChange = (key, value) => {
    setResults(prev => ({ ...prev, [key]: value }));
  };

  if (!isAuthenticated && isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Admin Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAdmin(false)}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PAISA 08</Text>
        {!isAuthenticated ? (
          <TouchableOpacity style={styles.button} onPress={() => setIsAdmin(true)}>
            <Text style={styles.buttonText}>Admin Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Time</Text>
            <Text style={styles.headerCell}>Coupon A</Text>
            <Text style={styles.headerCell}>Result</Text>
            <Text style={styles.headerCell}>Coupon B</Text>
            <Text style={styles.headerCell}>Result</Text>
          </View>
          {timeSlots.map((time, idx) => (
            <View key={time} style={[styles.tableRow, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={styles.cell}>{time}</Text>
              <Text style={styles.cell}>{couponA[idx]}</Text>
              <TextInput
                style={[styles.cell, styles.input]}
                value={results[`A-${idx + 1}`] || ''}
                onChangeText={(value) => handleResultChange(`A-${idx + 1}`, value)}
                editable={isAuthenticated}
              />
              <Text style={styles.cell}>{couponB[idx]}</Text>
              <TextInput
                style={[styles.cell, styles.input]}
                value={results[`B-${idx + 1}`] || ''}
                onChangeText={(value) => handleResultChange(`B-${idx + 1}`, value)}
                editable={isAuthenticated}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0099ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  loginContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 20,
    color: '#666',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});
