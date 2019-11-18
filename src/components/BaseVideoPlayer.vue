<template>
  <div class="vjs-custom-skin">
    <video ref="videoPlayer" class="video-js" ></video>
  </div>
</template>

<script>
import videojs from 'video.js'
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  name: 'BaseVideoPlayer',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    globalOptions: {
      type: Object,
      default: () => ({
        autoplay: false,
        controls: true,
        preload: 'auto',
        fluid: false,
        muted: false,
        controlBar: {
          remainingTimeDisplay: false,
          playToggle: {},
          progressControl: {},
          fullscreenToggle: {},
          volumeMenuButton: {
            inline: false,
            vertical: true
          }
        },
        techOrder: ['html5'],
        plugins: {}
      })
    }
  },
  data () {
    return {
      player: null
    }
  },
  mounted () {
    const options = Object.assign({}, this.globalOptions, this.options)
    this.player = videojs(this.$refs.videoPlayer, options, function onPlayerReady () {
      console.log('onPlayerReady', this)
      this.play()
    })
    this.player.play()
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
