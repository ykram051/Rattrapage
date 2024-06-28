<template>
  <div class="event-list-container">
    <h2 class="event-list-title">Events</h2>
    <div class="event-items">
      <EventItem v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/firebaseConfig';
import EventItem from './EventItem.vue';

export default {
  components: { EventItem },
  data() {
    return {
      events: []
    };
  },
  async created() {
    try {
      const snapshot = await db.collection('events').get();
      this.events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  }
};
</script>

<style>
.event-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-list-title {
  font-size: 1.75rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.event-list-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background-color: #007BFF;
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.event-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
