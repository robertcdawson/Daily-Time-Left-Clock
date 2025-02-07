<!-- TimeCircle.vue -->
<template>
  <div class="time-circle-container">
    <div class="time-circle">
      <svg
        viewBox="0 0 200 200"
        class="circle-svg"
      >
        <!-- Main circle -->
        <circle
          cx="100"
          cy="100"
          r="90"
          class="time-path"
        />
        <!-- Progress path -->
        <circle
          cx="100"
          cy="100"
          r="90"
          class="progress-path"
          :style="progressStyle"
        />
        <!-- Sun indicator -->
        <g class="sun-indicator" :style="sunTransformStyle">
          <circle
            cx="100"
            cy="10"
            r="6"
            class="sun-dot"
          />
          <circle
            cx="100"
            cy="10"
            r="8"
            class="sun-glow"
          />
        </g>
      </svg>
      
      <!-- Time display -->
      <div class="time-display">
        <div class="current-time">{{ formattedCurrentTime }}</div>
        <div class="time-remaining">{{ formattedTimeRemaining }}</div>
        <!-- Settings button moved here -->
        <button class="settings-button" @click="$emit('openSettings')">
          <svg viewBox="0 0 46 46" width="20" height="20" class="gear-icon">
            <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774
              c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815
              C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607
              c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205
              C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501
              C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763
              c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733
              s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128
              c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735
              c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77
              c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z
              M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85
              C30.906,27.334,27.355,30.85,22.976,30.85z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  wakeTime: {
    type: String,
    required: true
  },
  sleepTime: {
    type: String,
    required: true
  }
})

// Time calculations
const currentTime = ref(new Date())
let timer

// Update current time every minute
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60000) // Update every minute
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const updateTime = () => {
  currentTime.value = new Date()
}

// Convert time string to Date object
const timeStringToDate = (timeStr) => {
  const [hours, minutes] = timeStr.split(':')
  const date = new Date()
  date.setHours(parseInt(hours))
  date.setMinutes(parseInt(minutes))
  date.setSeconds(0)
  return date
}

// Calculate progress through the day
const dayProgress = computed(() => {
  const wake = timeStringToDate(props.wakeTime)
  const sleep = timeStringToDate(props.sleepTime)
  const current = currentTime.value
  
  const totalMinutes = (sleep - wake) / (1000 * 60)
  const elapsedMinutes = (current - wake) / (1000 * 60)
  
  return Math.max(0, Math.min(1, elapsedMinutes / totalMinutes))
})

// Calculate sun position
const sunPosition = computed(() => {
  const progress = dayProgress.value
  const angle = progress * 2 * Math.PI - Math.PI / 2 // Start from top (12 o'clock position)
  const radius = 90
  const centerX = 100
  const centerY = 100
  
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  }
})

// Format times for display
const formattedCurrentTime = computed(() => {
  return currentTime.value.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
})

const formattedTimeRemaining = computed(() => {
  const sleep = timeStringToDate(props.sleepTime)
  const current = currentTime.value
  const remainingMs = sleep - current
  
  if (remainingMs <= 0) return 'Day complete'
  
  const hours = Math.floor(remainingMs / (1000 * 60 * 60))
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hours}h ${minutes}m remaining`
})

// Add new computed properties for animations
const sunTransformStyle = computed(() => {
  const angle = dayProgress.value * 360
  return {
    transform: `rotate(${angle}deg)`,
    transformOrigin: '100px 100px'
  }
})

const progressStyle = computed(() => {
  const circumference = 2 * Math.PI * 90
  const offset = circumference * (1 - dayProgress.value)
  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset
  }
})
</script>

<style scoped>
.time-circle-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-circle {
  position: relative;
  width: min(90vh, 90vw);
  height: min(90vh, 90vw);
}

.circle-svg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.time-path {
  fill: none;
  stroke: rgba(204, 214, 224, 0.3);
  stroke-width: 1.5;
}

.progress-path {
  fill: none;
  stroke: rgba(74, 144, 226, 0.2);
  stroke-width: 1.5;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease;
}

.sun-indicator {
  transition: transform 0.5s ease;
}

.sun-dot {
  fill: #4a90e2;
}

.sun-glow {
  fill: none;
  stroke: rgba(74, 144, 226, 0.3);
  stroke-width: 1.5;
}

.time-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
}

.current-time {
  font-size: min(8vw, 3.5em);
  font-weight: 300;
  color: #2c3e50;
  letter-spacing: -0.02em;
}

.time-remaining {
  font-size: min(3vw, 1.2em);
  color: #666;
  font-weight: 400;
  margin-bottom: 0.5em;
}

.settings-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  opacity: 0.9;
  transition: all 0.3s ease;
  margin-top: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-button:hover {
  opacity: 1;
  transform: rotate(45deg);
}

.settings-button:hover .gear-icon {
  opacity: 0.8;
}

.gear-icon {
  fill: #4a90e2;
  opacity: 0.6;
  width: 20px;
  height: 20px;
}

@media (max-width: 480px) {
  .time-circle {
    width: 95vw;
    height: 95vw;
  }
}
</style> 