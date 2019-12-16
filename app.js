Vue.component('CoinDetail', {
  props: ['coin'],
  data () {
    return {
      showPrices:  false,
      value: 0
    }
  },
  computed: {
    convertedValue () {
      if(!this.value){
        return 0
      }
      return this.value / this.coin.price
    },
    title () {
      return `${this.coin.name} - ${this.coin.symbol}`
    }
  },
  methods: {
    toggleShowPrices () {
      this.showPrices = !this.showPrices
      this.$emit('change-color',  this.showPrices ? 'FF9668': '3D3D3D')
    }
  },
  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      v-bind:src="coin.img" v-bind:alt="coin.name">
    <h1 
        v-bind:class="coin.changePercent > 0? 'green' : 'red'">
        {{ title }}
        <span v-if="coin.changePercent > 0">😃</span>
        <span v-else-if="coin.changePercent < 0">🙃</span>
        <span v-else>😕</span>
        <span v-on:click="toggleShowPrices">{{ showPrices ? '➖' : '➕'}}</span>
      </h1>
      <input type="number" v-model="value">
      <span>{{ convertedValue }}</span>
      <slot name="text"></slot>
      <slot name="link"></slot>
      <ul v-show="showPrices">
        <li 
          class="uppercase"
          v-bind:class="{orange: priceWithDay.value == coin.price, red: priceWithDay.value < coin.price, green: priceWithDay.value > coin.price}"
          v-for="(priceWithDay, index) in coin.pricesWithDays" 
          v-bind:key="priceWithDay.day">
          {{ index }} - {{ priceWithDay.day }} - {{ priceWithDay.value }}
        </li>
      </ul>
    </div>
  `
})

new Vue({
  el: '#app',
  data () {
    return {
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: -1,
        price: 8400,
        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miercoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sabado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ],
      },
      color: 'f4f4f4'
    }
  },
  methods: {
    updateColor (color) {
      this.color = color || this.color.split('').reverse().join('')
    }
  },
})