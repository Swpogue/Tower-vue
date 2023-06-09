<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p>TOWER EVENTS</p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <div class="ms-5">
            <button class="btn btn-outline-primary" @click="openCreateEvent()">Create Event</button>
          </div>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About -->
          <!-- </router-link> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
<create-event-form id="createEvent"></create-event-form>

</template>

<script>
import { Modal } from "bootstrap"
import Login from './Login.vue';
export default {
  setup() {
    return {
      openCreateEvent() {
        Modal.getOrCreateInstance('#createEvent').show()
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
    background-color: black;
    
  }

 
}
</style>
