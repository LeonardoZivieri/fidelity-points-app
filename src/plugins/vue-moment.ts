import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/pt'

Vue.use(require('vue-moment'), { moment })

console.log(moment.locale())
