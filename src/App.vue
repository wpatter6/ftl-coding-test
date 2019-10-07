<template>
  <div id="app">
    <NumberCruncher />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NumberCruncher from './components/NumberCruncher.vue'

@Component({
  components: {
    NumberCruncher,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 800px;
}
textarea {
  height: 200px;
}
input,
textarea {
  margin: 15px 0;
  padding: 15px;
  width: 100%;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 30px;
  display: inline-block;
  box-sizing: border-box;
  transition: 0.2s ease all;
  font-size: 18px;
}
button {
  margin: 15px 5px;
  padding: 15px 50px;
  width: auto;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  clear: right;
  transition: 0.2s ease all;
  background: #ccc;
  border-radius: 30px;
  white-space: nowrap;
  font-size: 18px;

  &.ok {
    background: #1abc9c;
    color: white;
  }
}
</style>
