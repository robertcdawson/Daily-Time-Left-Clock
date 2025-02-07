<!-- TimeSettings.vue -->
<template>
  <div class="settings-overlay" @click.self="$emit('close')">
    <div class="settings-modal">
      <h2>Set Your Day</h2>
      
      <div class="time-input">
        <label for="wakeTime">Wake Time:</label>
        <input
          type="time"
          id="wakeTime"
          :value="wakeTime"
          @input="e => $emit('update:wakeTime', e.target.value)"
        >
      </div>
      
      <div class="time-input">
        <label for="sleepTime">Sleep Time:</label>
        <input
          type="time"
          id="sleepTime"
          :value="sleepTime"
          @input="e => $emit('update:sleepTime', e.target.value)"
        >
      </div>
      
      <button class="close-button" @click="$emit('close')">
        Save & Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  wakeTime: {
    type: String,
    required: true
  },
  sleepTime: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.settings-modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
}

h2 {
  margin: 0 0 1.5rem;
  color: #2c3e50;
  text-align: center;
}

.time-input {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input[type="time"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccd6e0;
  border-radius: 6px;
  font-size: 1rem;
}

.close-button {
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.close-button:hover {
  background: #357abd;
}
</style> 