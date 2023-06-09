<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createEvent()">
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput" placeholder="Event Title" v-model="editable.name">
              <label for="floatingInput">Event Title</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput" placeholder="Description" v-model="editable.description">
              <label for="floatingInput">Description</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput" placeholder="Location" v-model="editable.location">
              <label for="floatingInput">Location</label>
            </div>
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="floatingInput" placeholder="Capacity" v-model="editable.capacity">
              <label for="floatingInput">Capacity</label>
            </div>
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="floatingInput" placeholder="Ticket Amount" v-model="editable.ticketCount">
              <label for="floatingInput">Ticket Amount</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" placeholder="Cover Image" v-model="editable.coverImg">
              <label for="floatingPassword">Cover Image</label>
            </div>
            <div class="form-floating">
              <input type="datetime" class="form-control" id="floatingPassword" placeholder="date" v-model="editable.startDate">
              <label for="floatingPassword">Date</label>
            </div>
            <div>
              <select name="type" id="type" v-model="editable.type">
                <option value="concert">Concert</option>
                <option value="convention">Conventions</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Album</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue"
import Pop from "../utils/Pop.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,

      async createEvent() {
        try {
          const formData = editable.value
          const newTowerEvent = await towerEventsService.createEvent(formData)
          Modal.getOrCreateInstance('#createEvent').hide()
          editable.value = {}
          router.push({ name: 'EventDetailsPage', params: { id: newTowerEvent.id } })
        } catch (error) {
          Pop.error(error)
        }
      }

    }

  }
}
</script>


<style lang="scss" scoped>



</style>