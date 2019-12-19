<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<h2 class="text-center">{{customer.name}}</h2>
		</v-col>
		<v-col cols="12" class="py-1">
			<h3 class="text-center">Telefone {{customer.getTelephoneFormatted()}}</h3>
		</v-col>
		<v-col cols="12" class="py-1">
			<h3 class="text-center">Pontuação {{customer.getScore()}}</h3>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="primary" :to="{name: routeBase+'.edit'}">Editar</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="accent" :to="{name: routeBase+'.view'}">Historico</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="info" :to="{name: routeBase+'.registry'}">Registrar Evento</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="info" @click="sendWhatsMessage()">Enviar WhatsApp</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="secondary" :to="{name: routeBase+'.search'}">Procurar outro cliente</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({
		routeBase: 'app.fidelity-points',
		whatsappLink: '',
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		}
		this.whatsappLink = this.getWhatsAppLink()
	},
	methods: {
		sendWhatsMessage () {
			let url = 'https://api.whatsapp.com/send'
			url += '?phone=55' + this.customer.telephone
			url += '&text='
			if (this.customer.score) {
				url += encodeURI('Você tem ' + this.customer.score + ' pontos conosco, aproveite')
			} else {
				url += encodeURI('Você não tem nenhum ponto')
			}
			window.open(url)
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	})
}
</script>
