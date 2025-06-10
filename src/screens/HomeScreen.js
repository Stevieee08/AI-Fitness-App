import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          const { name } = JSON.parse(userProfile);
          if (name) {
            setUserName(name);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {userName}! 👋</Text>
          <Text style={styles.subtitle}>Ready for your next workout?</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#FF6B6B' }]}
              onPress={() => navigation.navigate('Workout')}
            >
              <Ionicons name="barbell" size={24} color="white" />
              <Text style={styles.quickActionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#4ECDC4' }]}
              onPress={() => navigation.navigate('Progress')}
            >
              <Ionicons name="stats-chart" size={24} color="white" />
              <Text style={styles.quickActionText}>View Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Full Body Workout</Text>
            <Text style={styles.planDuration}>45 min • 8 exercises</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons name="barbell" size={20} color="#007AFF" />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Upper Body Workout</Text>
              <Text style={styles.activitySubtitle}>Yesterday • 40 min</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickAction: {
    flex: 0.48,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  planDuration: {
    color: '#666',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activitySubtitle: {
    color: '#999',
    fontSize: 14,
  },
});

export default HomeScreen;
