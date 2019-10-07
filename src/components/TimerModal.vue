<template>
  <modal name="timer-modal" :width="600" adaptive :click-to-close="false">
    <div class="timer__modal-body">
      <h4>Please input the number of time in seconds between emitting numbers and their frequency</h4>
      <input numeric-only ref="input" type="tel" v-model="selectedValue" />
      <button :class="parseInt(selectedValue) > 0 ? 'ok' : ''" @click="selectValue">Continue</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class TimerModal extends Vue {
  selectedValue: string

  @Prop() value: number

  constructor() {
    super()
    this.selectedValue = ''
  }

  show() {
    this.$modal.show('timer-modal')
    this.$emit('show')
    setTimeout(() => {
      const input = this.$refs.input as HTMLInputElement
      input.focus()
      input.select()
    }, 100)
  }

  selectValue() {
    if (parseInt(selectedValue) > 0) {
      this.$modal.hide('timer-modal')
      this.$emit('hide')
    }
  }

  mounted() {
    this.selectedValue = String(this.value)
  }

  @Watch('selelectedValue')
  selectedValueChanged(val: string) {
    this.$emit('input', parseInt(val, 10))
  }
}
</script>

<style scoped lang="scss">
.timer__modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>