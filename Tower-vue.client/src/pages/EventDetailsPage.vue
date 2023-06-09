<template>
  <div class="card mb-2 container-fluid">
    <section class="card-body row">
      <div class="mb-1 col-md-2">
        <img class="img-fluid rounded event-picture" :src="event?.coverImg" :alt="event?.name">
      </div>
      <div class="col-md-7">
        <p class="p-1"><b>{{ event?.name }}</b></p>
        <p class="p-1"><b>{{ event?.location }}</b></p>
        <p class="p-1"><b>{{ event?.description }}</b></p>
      </div>
      <div class="col-md-3 text-end pe-4">
        <p>Date: {{ event?.startDate }}</p>
      </div>
      <section class="d-flex justify-content-between col-md-12">
        <div>
          <p class="mb-0">Tickets Left: {{ event?.capacity - event?.ticketCount }}</p>
          <p class="mb-0">Capacity: {{ event?.capacity }}</p>
        </div>
        <div class="col-md-1" v-if="!event?.isCanceled && event?.ticketCount < event?.capacity">
          <!-- TODO disable this button if attending -->
          <button :disabled="isTicketHolder" @click="createTicket()" class="">Get Ticket</button>
        </div>
        <p v-if="event?.isCanceled" class="canceled">Canceled!</p>
        <p v-if="event?.ticketCount >= event?.capacity" class="canceled">Sold Out!</p>
        <div v-if="event?.creatorId == account.id">
          <button :disabled="event?.isCanceled" @click="cancelEvent()">Cancel</button>
        </div>
      </section>
    </section>
  </div>

  <!-- Ticket Holders! -->
  <section class="container-fluid">
    <div class="row">
      <p class="text-white">WE'RE GOING!</p>
      <div class="col-md-1 pb-4" v-for="h in tickets" :key="h.id">
        <img class="rounded-circle ticketHolder" :src="h.profile.picture" alt="">
        <p class="text-white">{{ h.profile.name }}</p>
      </div>
    </div>
  </section>

  <!-- Comment Section -->
  <section class="row justify-content-center" v-if="account.id">
    <div class="col-6 card p-2">
      <form @submit.prevent="createComment()" class="card elevation-3">
        <div class="m-2 d-flex">
          <img id="profile-img" class="p-2 col-md-2 rounded-circle" :src="account.picture" :alt="account.name">
          <textarea v-model="editable.body" class="comment-form col-10 rounded" placeholder="Comment here" id="textarea"></textarea>
          <label for="textarea"></label>
        </div>
        <button class="btn btn-primary m-2">Post IT!</button>
      </form>
      <div v-for="c in comments" :key="c.id" class="row p-2 m-1 border border-dark">
        <CommentCard :comment="c" />
      </div>
    </div>
  </section>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js"
import { ticketsService } from "../services/TicketsService.js"
import { logger } from "../utils/Logger.js";
import CreateEventForm from "../components/CreateEventForm.vue";

export default {
  setup() {
    const route = useRoute();

    async function getTicketHoldersByEventId() {
      try {
        const eventId = route.params.id
        await ticketsService.getTicketHoldersByEventId(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }



    async function getEventById() {
      try {
        const eventId = route.params.id;
        await towerEventsService.getEventById(eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getCommentsByEventId() {
      try {
        const eventId = route.params.id;
        await commentsService.getCommentsByEventId(eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getTicketHoldersByEventId();
    });
    const editable = ref({});
    return {
      event: computed(() => AppState.activeEvent),
      editable,
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      towerEvent: computed(() => AppState.towerEvents),
      tickets: computed(() => AppState.tickets),
      isTicketHolder: computed(() => AppState.tickets.find(th => th.accountId == AppState.account.id)),

      async createComment() {
        try {
          // logger.log("COMMENTS!!!");
          const formData = editable.value;
          formData.eventId = route.params.id;
          await commentsService.createComment(formData);
          editable.value = {};
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async createTicket() {
        try {
          let existingTicket = AppState.tickets.find(t => t.accountId == AppState.account.id);
          if (existingTicket) {
            Pop.error('You Only get ONE Ticket!')

          } else {
            const eventId = route.params.id;
            await ticketsService.createTicket(eventId);
            // logger.log('DID YOU TRY TO GET A TICKET?')
          }
        }
        catch (error) {
          Pop.error(error);
        }
      },

      async cancelEvent() {
        try {
          if (await Pop.confirm('Cancel Event!?')) {
            await towerEventsService.cancelEvent(route.params.id)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
    };
  },
  // components: { CreateEventForm }
}
</script>


<style lang="scss" scoped>
.card-body {
  background-color: rgb(194, 236, 238);
}

.canceled {
  background-color: red;

}

.ticketHolder {
  height: 3em;
}

// #textarea{
//   width: 40em;
// }
.event-picture {
  height: 20em;
}
</style>