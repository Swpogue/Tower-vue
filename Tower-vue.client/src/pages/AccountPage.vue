<template>
  <div class="text-white">

    <div v-for="m in myTickets" :key="m.id">
      <MyTicketCard :towerEvent="m.towerEvent" />
      {{ myTickets }}
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
    onMounted(()=> getMyTickets())
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
      towerEvent: computed(() => AppState.towerEvents),
      



      
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
