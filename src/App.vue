<template>
  <div class="app-container" :style="getBackgroundStyle">
    <TimeCircle 
      :wakeTime="wakeTime"
      :sleepTime="sleepTime"
      @openSettings="showSettings = true"
    />
    <TimeSettings
      v-if="showSettings"
      :wakeTime="wakeTime"
      :sleepTime="sleepTime"
      @update:wakeTime="updateWakeTime"
      @update:sleepTime="updateSleepTime"
      @close="showSettings = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TimeCircle from './components/TimeCircle.vue'
import TimeSettings from './components/TimeSettings.vue'

// Default times
const DEFAULT_WAKE_TIME = '07:00'
const DEFAULT_SLEEP_TIME = '23:00'

const showSettings = ref(false)
const wakeTime = ref(DEFAULT_WAKE_TIME)
const sleepTime = ref(DEFAULT_SLEEP_TIME)

// Load saved times from localStorage
onMounted(() => {
  const savedWakeTime = localStorage.getItem('wakeTime')
  const savedSleepTime = localStorage.getItem('sleepTime')
  
  if (savedWakeTime) wakeTime.value = savedWakeTime
  if (savedSleepTime) sleepTime.value = savedSleepTime
})

// Update functions
const updateWakeTime = (newTime) => {
  wakeTime.value = newTime
  localStorage.setItem('wakeTime', newTime)
}

const updateSleepTime = (newTime) => {
  sleepTime.value = newTime
  localStorage.setItem('sleepTime', newTime)
}

// Calculate background colors based on time of day
const getBackgroundStyle = computed(() => {
  const now = new Date()
  const hour = now.getHours()
  
  // Color schemes for different times of day
  const colors = {
    dawn: ['#F3E6E8', '#D5E0E6'],    // 5-7
    morning: ['#E6F0F3', '#EDF3FA'], // 7-11
    noon: ['#F0F4F8', '#E8F1F8'],    // 11-15
    afternoon: ['#E8F1F8', '#E6EDF5'], // 15-18
    evening: ['#E6EDF5', '#E4E9F2'],   // 18-21
    night: ['#E4E9F2', '#E2E6EF']      // 21-5
  }
  
  let gradient
  if (hour >= 5 && hour < 7) gradient = colors.dawn
  else if (hour >= 7 && hour < 11) gradient = colors.morning
  else if (hour >= 11 && hour < 15) gradient = colors.noon
  else if (hour >= 15 && hour < 18) gradient = colors.afternoon
  else if (hour >= 18 && hour < 21) gradient = colors.evening
  else gradient = colors.night
  
  return {
    background: `linear-gradient(to bottom right, ${gradient[0]}, ${gradient[1]})`
  }
})
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 3s ease;
  overflow: hidden;
}
</style>
