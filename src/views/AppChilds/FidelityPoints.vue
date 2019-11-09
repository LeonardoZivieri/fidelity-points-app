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
						append-icon="search"
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
	methods: {
		search () {
		}
	}
}
</script>
