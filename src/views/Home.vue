<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src

// import BaseVideoPlayer from '../components/BaseVideoPlayer'
import http from '../util/request'
export default {
  name: 'home',
  components: {
    // BaseVideoPlayer
  },
  mounted () {
    this.login().then(() => {
      setTimeout(this.getList(), 3000)
    })
  },
  data () {
    return {
      data: {}
      // videoOptions: {
      //   muted: false,
      //   language: 'en',
      //   playbackRates: [0.7, 1.0, 1.5, 2.0],
      //   width: 720,
      //   flash: { hls: { withCredentials: false } },
      //   html5: { hls: { withCredentials: false } },
      //   // sources: [{
      //   //   type: 'video/mp4',
      //   //   src: 'https://wqbdoc.oss-cn-shenzhen.aliyuncs.com/videos/20190801083347.mp4'
      //   // }]
      //   sources: [{
      //     withCredentials: false,
      //     type: 'application/x-mpegURL',
      //     src: 'http://192.168.1.165:8888/live/9527.m3u8'
      //   }]
      // }
    }
  },
  methods: {
    login () {
      console.log("login")
      return http.post('http://localhost:8090/oauth/token', {
        grant_type: 'password',
        username: '18684844593',
        password: '123456',
        client_id: 'app'
      }).then(result => {
        this.tokenData = result.data
      })
    },
    getList () {
      http.request({
        url: 'http://localhost:8090/industries',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + this.data.access_token
        }
      }).then(result => {
        console.log(result)
      })
    }
  }
}
</script>
