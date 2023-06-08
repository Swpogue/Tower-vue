<template>
  <div class="p-2 col-md-2">
    <img class="rounded-circle" :src="comment.creator.picture" alt="">
  </div>
<div class="col-md-10 pt-3">
<p>{{ comment.body }}</p>
</div>
</template>


<script>
import { Comment } from "../models/Comment.js";

export default {
  props: {
    comment: { type: Comment, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

img{
  height: 4em;
}

</style>