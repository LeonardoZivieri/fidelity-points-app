<template>
	<v-container>
		<v-row>
			<v-col
					cols="12"
					sm="8" offset-sm="2"
					md="6" offset-md="3"
				>
				<v-text-field
						v-model="cpf"
						label="CPF"
						v-mask="'###.###.###-##'"
						:append-icon="validCpf ? 'search' : 'warning'"
						@click:append="search"
						@keyup.enter="search"
					/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

export default {
	name: 'AppIndex',
	data () {
		return {
			cpf: ''
		}
	},
	computed: {
		validCpf () {
			// CPF Valido de acordo com o código em https://www.devmedia.com.br/validar-cpf-com-javascript/23916
			let strCPF = this.cpf.replace(/[^0-9]/g, '')
			if (strCPF.length !== 11) return false

			let Soma = 0
			let Resto = 0
			Soma = 0
			if (strCPF === '00000000000') return false

			for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
			Resto = (Soma * 10) % 11

			if ((Resto === 10) || (Resto === 11)) Resto = 0
			if (Resto !== parseInt(strCPF.substring(9, 10))) return false

			Soma = 0
			for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
			Resto = (Soma * 10) % 11

			if ((Resto === 10) || (Resto === 11)) Resto = 0
			if (Resto !== parseInt(strCPF.substring(10, 11))) return false
			return true
		}
	},
	methods: {
		search () {
			if (!this.validCpf) return false
		}
	}
}
</script>
