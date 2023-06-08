<template>
  <div class="container-fluid text-black">
    <section class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex justify-content-around my-3 bg-info rounded p-3">
          <!-- TODO make these buttons work -->
          <button @click="filterBy = ''" class="btn btn-bg-info text-white w-40 mx-2">All</button>
          <button @click="filterBy = 'concert'" class="btn btn-bg-info text-white w-40 mx-2">Concert</button>
          <button @click="filterBy = 'conventions'" class="btn btn-bg-info text-white w-40 mx-2">Conventions</button>
          <button @click="filterBy = 'sport'" class="btn btn-bg-info text-white w-40 mx-2">Sport</button>
          <button @click="filterBy = 'digital'" class="btn btn-bg-info text-white w-40 mx-2">Digital</button>
        </div>
      </div>
    </section>
    <section class="row px-5">
      <div class="col-md-3 my-3 p-4" v-for="t in towerEvents" :key="t.id">
        <EventCard :towerEvent="t" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { towerEventsService } from '../services/TowerEventsService.js'
import { computed, onMounted, ref } from "vue";
import EventCard from "../components/EventCard.vue";
import { AppState } from '../AppState.js'
import { logger } from "../utils/Logger.js";

export default {
    setup() {
      const filterBy = ref('')
      onMounted(() => { getTowerEvents(); });
        async function getTowerEvents() {
            try {
                await towerEventsService.getTowerEvents();
                logger.log("HOMEPAGE")
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
          filterBy,
          towerEvents: computed(()=> {
            if (filterBy.value == '') {
              return  AppState.towerEvents
            }else {
              return AppState.towerEvents.filter(t => t.type == filterBy.value)
            }
          })

        };
    },
    components: { EventCard },
}
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;

//   .home-card {
//     width: 50vw;

//     >img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
