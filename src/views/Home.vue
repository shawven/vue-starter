<template>
  <div class="home">
    <base-video-player></base-video-player>
  </div>
</template>

<script>
// @ is an alias to /src

import BaseVideoPlayer from '../components/BaseVideoPlayer'
export default {
  name: 'home',
  components: {
    BaseVideoPlayer

  }
}
</script>
