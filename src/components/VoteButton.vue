<template>
  <div class="vote-buttons">
    <button @click="vote('yes')" class="yes-vote">Yes</button>
    <button @click="vote('no')" class="no-vote">No</button>
  </div>
</template>

<script>
import { db, auth } from '../firebase/firebaseConfig';

export default {
  props: ['eventId'],
  methods: {
    async vote(type) {
      const userId = auth.currentUser.uid;
      const voteRef = db.collection('votes').doc(`${this.eventId}_${userId}`);
      const eventRef = db.collection('events').doc(this.eventId);

      try {
        await db.runTransaction(async transaction => {
          const voteSnapshot = await transaction.get(voteRef);
          if (!voteSnapshot.exists) {
            const eventSnapshot = await transaction.get(eventRef);
            const data = eventSnapshot.data();

            if (type === 'yes') {
              transaction.update(eventRef, { yesVotes: data.yesVotes + 1 });
              this.$emit('update-votes', { yesVotes: data.yesVotes + 1, noVotes: data.noVotes });
            } else {
              transaction.update(eventRef, { noVotes: data.noVotes + 1 });
              this.$emit('update-votes', { yesVotes: data.yesVotes, noVotes: data.noVotes + 1 });
            }

            transaction.set(voteRef, { eventId: this.eventId, userId, vote: type });
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
.vote-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.yes-vote, .no-vote {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.yes-vote {
  background-color: #007BFF;
  color: white;
}

.no-vote {
  background-color: #dc3545;
  color: white;
}
</style>
