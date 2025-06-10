import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to AI Fitness',
    description: 'Your personal AI-powered fitness companion to help you achieve your goals',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    key: '2',
    title: 'Personalized Workouts',
    description: 'Get customized workout plans based on your fitness level and goals',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    key: '3',
    title: 'Track Your Progress',
    description: 'Monitor your improvements and stay motivated with detailed analytics',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

const WelcomeScreen = ({ navigation, route }) => {
  const scrollViewRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  
  const onComplete = route.params?.onComplete || (() => {
    console.log('Navigating to UserInfo');
    navigation.navigate('UserInfo');
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const scrollToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < slides.length && scrollViewRef.current) {
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }
  };

  const handleViewChange = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [width * (i - 1), width * i, width * (i + 1)],
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });

          const dotOpacity = scrollX.interpolate({
            inputRange: [width * (i - 1), width * i, width * (i + 1)],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const handleGetStarted = () => {
    if (typeof onComplete === 'function') {
      onComplete();
    } else {
      navigation.navigate('UserInfo');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleViewChange}
        scrollEventThrottle={16}
      >
        {slides.map((item) => (
          <View key={item.key} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {renderDots()}

      <View style={styles.buttonContainer}>
        {currentIndex < slides.length - 1 ? (
          <>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={onComplete}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={scrollToNext}
            >
              <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => {
              console.log('Get Started pressed');
              onComplete();
            }}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  getStartedButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
