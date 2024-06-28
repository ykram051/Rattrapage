<template>
  <div class="event-detail-container">
    <h2 class="event-title">{{ event.title }}</h2>
    <p class="event-description">{{ event.description }}</p>
    <p class="event-date">Date: {{ new Date(event.date).toLocaleDateString() }}</p>
    <p class="event-created">
      <span class="label">Created:</span> {{ new Date(event.createdAt).toLocaleString() }}
    </p>
    <p class="event-updated">
      <span class="label">Last Updated:</span> {{ new Date(event.updatedAt).toLocaleString() }}
    </p>
    <div class="event-votes">
      <span class="yes-votes" @click="vote('yes')">
        Yes: <span class="vote-count">{{ event.yesVotes }}</span>
      </span>
      <span class="no-votes" @click="vote('no')">
        No: <span class="vote-count">{{ event.noVotes }}</span>
      </span>
    </div>
  
  </div>
</template>

<script>
import { db, auth } from '../firebase/firebaseConfig';
import VoteButton from '../components/VoteButton.vue';

export default {
  components: { VoteButton },
  data() {
    return {
      event: {}
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    const doc = await db.collection('events').doc(eventId).get();
    this.event = { id: doc.id, ...doc.data() };
  },
  methods: {
    updateVotes(voteData) {
      this.event.yesVotes = voteData.yesVotes;
      this.event.noVotes = voteData.noVotes;
    },
    async vote(type) {
      const userId = auth.currentUser.uid;
      const voteRef = db.collection('votes').doc(`${this.event.id}_${userId}`);
      const eventRef = db.collection('events').doc(this.event.id);

      try {
        await db.runTransaction(async transaction => {
          const voteSnapshot = await transaction.get(voteRef);
          if (!voteSnapshot.exists) {
            const eventSnapshot = await transaction.get(eventRef);
            const data = eventSnapshot.data();

            if (type === 'yes') {
              transaction.update(eventRef, { yesVotes: data.yesVotes + 1 });
              this.updateVotes({ yesVotes: data.yesVotes + 1, noVotes: data.noVotes });
            } else {
              transaction.update(eventRef, { noVotes: data.noVotes + 1 });
              this.updateVotes({ yesVotes: data.yesVotes, noVotes: data.noVotes + 1 });
            }

            transaction.set(voteRef, { eventId: this.event.id, userId, vote: type });
          } else {
            alert("You have already voted for this event.");
          }
        });
      } catch (error) {
        console.error("Transaction failed: ", error);
      }
    }
  }
};
</script>

<style>
.event-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
}

.event-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background-color: #007BFF;
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.event-description {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.event-date {
  font-size: 1rem;
  color: #999;
  margin-bottom: 1.5rem;
  text-align: center;
}

.event-created, .event-updated {
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
  text-align: center;
}

.event-created .label, .event-updated .label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.event-votes {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.yes-votes, .no-votes {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  width: 120px; /* Adjust width as needed */
}

.yes-votes {
  background-color: #007BFF;
  color: #fff;
}

.no-votes {
  background-color: #dc3545;
  color: #fff;
}

.vote-count {
  font-weight: bold;
}
</style>
