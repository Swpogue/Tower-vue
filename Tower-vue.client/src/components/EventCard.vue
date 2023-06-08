<template>
  <div class="rounded elevation-5 event-card">
            <img class="rounded-top" :src="towerEvent.coverImg" :alt="towerEvent.name">
            <div class="text-center p-2 rounded-bottom text-black fw-bold" >
                <p class="m-0">{{ towerEvent.name }}</p>
                <!-- TODO put ticket count here -->
                <p class="m-0">{{ towerEvent.ticketCount }}<i class="mdi mdi-ticket ps-2"></i></p>
            </div>
        </div>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js"
export default {
  props: {
    towerEvent: {type: TowerEvent, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.event-card {
    box-shadow: 2px 2px white;
    background-color: rgb(247, 237, 212);

    img {
        height: 30vh;
        width: 100%;
        object-fit: cover;
    }
}
</style>