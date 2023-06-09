<template>
  <div class="text-white">

    <div class="p-3" v-for="m in myTickets" :key="m.id">
      <MyTicketsCard :towerEvent="m.event" />
      <!-- {{ myTickets }} -->
      <button @click="deleteTicket()">Sell</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    onMounted(() => getMyTickets())
    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      // towerEvent: computed(() => AppState.towerEvents),

      async deleteTicket() {
        try {
            const myTicket = AppState.myTickets.find(c => c.accountId == AppState.user.id)
            await ticketsService.deleteTicket(myTicket.id)
        
        } catch (error) {
          // Pop.error('NOT YOUR TICKET')
        }
      },



    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
