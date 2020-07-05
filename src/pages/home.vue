<template>
  <div>
    <h1>Home</h1>
    <hr />
    <h1>{{count}}</h1>
    <button @click="INCREMENT">加一+</button>
    <button @click="DECREMENT">减一-</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    // 从 store 的 state 对象中的获取 item。
    count() {
      return this.$store.state.count;
    },
    ...mapGetters({
      topics: "getTopics"
    })
  },
  methods: {
    ...mapActions(["INCREMENT", "DECREMENT"])
  }
};
</script>