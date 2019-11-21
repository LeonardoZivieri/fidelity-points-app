<template>
	<v-container>
		<v-row>
			<v-col
					cols="12"
					sm="8" offset-sm="2"
					md="6" offset-md="3"
				>
				<v-row v-if="screen == 'loading'">
					<v-col style="text-align: center">
						<v-progress-circular
								:size="50"
								:width="4"
								color="primary"
								indeterminate
							/>
					</v-col>
				</v-row>
				<v-row v-if="screen == 'search'">
					<v-col style="text-align: center">
						<v-text-field
								:loading="client === null && loading"
								:disabled="client !== null && loading"
								v-model="cpf"
								label="CPF"
								v-mask="'###.###.###-##'"
								:append-icon="validCpf ? 'search' : 'warning'"
								@click:append="search"
								@keyup.enter="search"
							/>
					</v-col>
				</v-row>
				<v-row v-if="screen == 'edit'">
					<v-col cols="12" class="py-1">
						<h2 class="text-center">Cliente {{client.getDocumentFormatted()}}</h2>
					</v-col>
					<v-col
							cols="12"
							lg="6"
						>
						<v-text-field
								:value="client.name"
								@input="client.setName($event)"
								label="Nome"
								counter="100"
							/>
					</v-col>
					<v-col
							cols="12"
							lg="6"
						>
						<v-text-field
								v-model="dataNascimento"
								label="Data Nascimento"
								counter="100"
								v-mask="'##/##/####'"
							/>
					</v-col>
					<v-col cols="12">
						<v-text-field
								:value="client.email"
								@input="client.setEmail($event)"
								label="Email"
								counter="100"
							/>
					</v-col>
					<v-col cols="6">
						<v-btn block color="secondary" @click="screen='search'">Cancelar</v-btn>
					</v-col>
					<v-col cols="6">
						<v-btn block color="primary" @click="update">Salvar</v-btn>
					</v-col>
				</v-row>
				<v-row v-if="screen == 'info'">
					<v-col cols="12" class="py-1">
						<h2 class="text-center">{{client.name}}</h2>
					</v-col>
					<v-col cols="12" class="py-1">
						<h3 class="text-center">Documento {{client.getDocumentFormatted()}}</h3>
					</v-col>
					<v-col cols="12" class="py-1">
						<v-btn block color="primary" @click="screen='edit'">Editar</v-btn>
					</v-col>
					<v-col cols="12" class="py-1">
						<v-btn block color="accent" @click="screen='history'">Historico</v-btn>
					</v-col>
					<v-col cols="12" class="py-1">
						<v-btn block color="info" @click="screen='registry'">Registrar Evento</v-btn>
					</v-col>
					<v-col cols="12" class="py-1">
						<v-btn block color="secondary" @click="screen='search'">Procurar outro cliente</v-btn>
					</v-col>
				</v-row>
				<v-form
						v-if="screen == 'registry'"
						v-model="registryForm.valid"
						ref="registryForm"
					>
					<v-row>
						<v-col cols="12">
							<v-textarea
									v-model="registryForm.comment"
									label="Comentário"
									auto-grow
									:rows="2"
									:rules="[(v) => !!v || 'Comentário obrigatorio']"
									counter="200"
								/>
						</v-col>
						<v-col cols="12">
							<InputPoints v-model="registryForm.points"/>
						</v-col>
						<v-col cols="12" md="6" class="py-1">
							<v-btn block color="primary" @click="registry()">Registrar</v-btn>
						</v-col>
						<v-col cols="12" md="6" class="py-1">
							<v-btn block color="secondary" @click="screen='info'">Voltar</v-btn>
						</v-col>
					</v-row>
				</v-form>
				<v-row v-if="screen == 'history'">
					<v-col cols="12" class="py-1">
						<v-btn block color="secondary" @click="screen='info'">Voltar</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row>
			<v-col
					cols="12"
					sm="8" offset-sm="2"
					md="6" offset-md="3"
				>
				<v-text-field
						:loading="client === null && loading"
						:disabled="client !== null && loading"
						v-model="cpf"
						label="CPF"
						v-mask="'###.###.###-##'"
						:append-icon="validCpf ? 'search' : 'warning'"
						@click:append="search"
						@keyup.enter="search"
					/>
			</v-col>
		</v-row>
		<v-row v-if="client !== null && loading">
			<v-col style="text-align: center">
				<v-progress-circular
						:size="50"
						:width="4"
						color="primary"
						indeterminate
					/>
			</v-col>
		</v-row>
		<v-row v-if="client !== null && !loading">
			<v-col
					cols="12"
					sm="8" offset-sm="2"
					md="6" offset-md="3"
				>
				<v-row>
					<v-col
							cols="12"
							lg="6"
						>
						<v-text-field
								:value="client.name"
								@input="client.setName($event)"
								label="Nome"
								counter="100"
							/>
					</v-col>
					<v-col
							cols="12"
							lg="6"
						>
						<v-text-field
								v-model="dataNascimento"
								label="Data Nascimento"
								counter="100"
								v-mask="'##/##/####'"
							/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
								:value="client.email"
								@input="client.setEmail($event)"
								label="Email"
								counter="100"
							/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-btn block color="primary" @click="update">Salvar</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { firestore } from 'firebase'

import InputPoints from '@/components/Form/InputPoints'

export default {
	name: 'AppIndex',
	components: {
		InputPoints
	},
	data () {
		return {
			screen: 'search',
			cpf: '',
			client: null,
			loading: false,
			dataNascimento: '',
			registryForm: {
				valid: false,
				comment: '',
				points: 0,
			}
		}
	},
	watch: {
		cpf (newValue, oldValue) {
			this.client = null
		},
		dataNascimento (newValue, oldValue) {
			if (newValue.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)) {
				this.client.setBirthday(new Date(newValue.split('/').reverse().join('-')))
			} else {
				this.client.setBirthday(null)
			}
		},
		client (newValue, oldValue) {
			if (newValue && newValue.birthday !== -1) {
				this.dataNascimento = new Date(newValue.birthday).toJSON().substr(0, 10).split('-').reverse().join('/')
			} else {
				this.dataNascimento = ''
			}
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
		async search () {
			if (!this.validCpf) return false
			this.screen = 'loading'
			this.loading = true
			this.client = await this.$store.dispatch('customerConsult', this.cpf.replace(/[^0-9]/g, ''))
			this.loading = false
			this.screen = this.client.saved ? 'info' : 'edit'
		},
		async update () {
			this.screen = 'loading'
			this.loading = true
			await this.$store.dispatch('customerSave', this.client)
			this.loading = false
			this.screen = 'info'
		},
		async registry () {
			this.screen = 'loading'
			this.loading = true
			await this.$store.dispatch(
				'customerRegistryHistory',
				{
					customer: this.client,
					comment: this.registryForm.comment,
					points: this.registryForm.points
				}
			)
			this.loading = false
			this.screen = 'info'
		}
	}
}
</script>
