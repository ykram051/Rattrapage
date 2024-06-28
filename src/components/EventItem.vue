<template>
  <div class="event-item">
    <h3 class="event-title">{{ event.title }}</h3>
    <p class="event-date">{{ event.description }}</p>
    
    <router-link :to="`/event/${event.id}`" class="view-details">View Details</router-link>
  </div>
</template>

<script>
export default {
  props: ['event']
};
</script>

<style>
.event-item {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.event-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.event-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 1rem;
}


.view-details {
  display: inline-block;
  margin-top: 1rem;
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}

.view-details:hover {
  text-decoration: underline;
}
</style>
