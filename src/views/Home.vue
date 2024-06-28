<template>
  <div class="home-container">
    <h1 class="home-title">Welcome to the Student Voting App</h1>
    <div class="event-list">
      <EventList />
    </div>
  </div>
</template>

<script>
import EventList from '../components/EventList.vue';

export default {
  components: { EventList }
};
</script>

<style>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home-title {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.home-title::after {
  content: "";
  display: block;
  width: 50px;
  height: 4px;
  margin: 0.5rem auto 0;
  background-color: #007BFF;
  border-radius: 2px;
}

.event-list {
  margin-top: 1rem;
}
</style>
