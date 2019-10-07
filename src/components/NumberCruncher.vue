<template>
  <div class="number__cruncher">
    <timer-modal v-model="outputFrequencySeconds" @hide="frequencySelected = true" ref="timerModal"></timer-modal>
    <div v-if="frequencySelected" class="number__cruncher-body">
      <h3>Please enter the {{numbers.length === 0 ? 'first' : 'next'}} number</h3>
      <div class="number__cruncher-input">
        <input numeric-only type="tel" v-model="nextNumber" />
        <button @click="addNumber" :class="nextNumber ? 'ok' : ''">Add Number</button>
      </div>
      <textarea ref="log" readonly class="number__cruncher-log" :value="log.trim()"></textarea>
      <div class="number__cruncher-options">
        <div class="number__cruncher-countdown">
          <h4
            v-show="numbers.length > 0 && !quitting"
          >Seconds to next output: {{timeToNextOutput / 1000}}</h4>
          <h4 v-show="quitting">Thanks for playing!</h4>
        </div>
        <div class="number__cruncher-buttons">
          <button
            v-show="numbers.length > 0"
            @click="active = !active"
          >{{active ? 'Halt' : 'Resume'}}</button>
          <button @click="quit">Quit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import TimerModal from './TimerModal.vue'
import { isFibonacci } from '@/util/fibonacci'

const defaultFrequencySeconds = 5
const intervalFrequency = 13

interface NumberAggregate {
  num: number
  count: number
}

@Component({
  components: {
    TimerModal,
  },
})
export default class NumberCruncher extends Vue {
  outputFrequencySeconds: number

  timeToNextOutput: number

  frequencySelected: boolean

  log: string

  nextNumber: string

  active: boolean

  numbers: number[]

  interval: number

  quitting: boolean

  $refs: {
    timerModal: TimerModal
    log: HTMLTextAreaElement
  }

  get outputString() {
    if (!this.numbers) {
      return ''
    }
    const aggregate = this.numbers.reduce(
      (acc: NumberAggregate[], current: number) => {
        const existing = acc.find(x => x.num === current)
        if (existing) {
          existing.count++
        } else {
          acc.push({ num: current, count: 1 })
        }
        return acc
      },
      [] as NumberAggregate[],
    )

    return aggregate.reduce((acc: string, current: NumberAggregate) => {
      if (acc) {
        acc += ', '
      }
      acc += current.num + ':' + current.count
      return acc
    }, '')
  }

  constructor() {
    super()
    this.outputFrequencySeconds = defaultFrequencySeconds
    this.timeToNextOutput = this.outputFrequencySeconds
    this.active = false
    this.nextNumber = ''
    this.frequencySelected = false
    this.numbers = []
    this.log = ''
    this.quitting = false
  }

  mounted() {
    if (this.$refs.timerModal.show) {
      this.$refs.timerModal.show()
    }
  }

  quit() {
    this.quitting = true
    setTimeout(() => window.location.reload(), 2000)
  }

  async addNumber() {
    if (this.nextNumber) {
      if (this.numbers.length === 0) {
        this.active = true
      }

      const nextNumberInt = parseInt(this.nextNumber, 10)

      this.numbers.push(nextNumberInt)
      this.nextNumber = ''

      if (await isFibonacci(nextNumberInt)) {
        this.$nextTick(() => this.addLog('FIB'))
      }
    }
  }

  addLog(str: string) {
    this.log += `\n\n${str}`
  }

  @Watch('active')
  activeChanged(val: boolean) {
    // Called whenever `active` boolean is toggled
    if (val) {
      if (this.timeToNextOutput <= 0) {
        this.timeToNextOutput = this.outputFrequencySeconds * 1000
      }
      this.interval = setInterval(() => {
        this.timeToNextOutput = this.timeToNextOutput - intervalFrequency

        if (this.timeToNextOutput <= 0) {
          this.timeToNextOutput = this.outputFrequencySeconds * 1000
          this.addLog(this.outputString)
        }
      }, intervalFrequency)

      if (this.log) {
        this.addLog('timer resumed')
      }
    } else {
      clearInterval(this.interval)
      this.addLog('timer halted')
    }
  }

  @Watch('log')
  logChanged(val: string) {
    // Ensure latest log message is always visible
    this.$nextTick(
      () => (this.$refs.log.scrollTop = this.$refs.log.scrollHeight),
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.number__cruncher {
  margin: 0 20px;
  h3,
  h4 {
    margin: 0;
    text-align: left;
  }
  .number__cruncher-input {
    display: flex;
    align-items: center;
  }
  .number__cruncher-log {
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .number__cruncher-options {
    display: flex;
    justify-content: space-between;

    .number__cruncher-buttons {
      display: flex;
    }
  }
  @media only screen and (max-width: 600px) {
    h3 {
      text-align: center;
    }
    .number__cruncher-input {
      flex-direction: column;
      button {
        width: 100%;
        margin-top: 0;
      }
    }

    .number__cruncher-options {
      flex-direction: column;
    }

    .number__cruncher-buttons {
      width: 100%;
      justify-content: stretch;

      button {
        width: 100%;
      }
    }
  }
}
</style>
