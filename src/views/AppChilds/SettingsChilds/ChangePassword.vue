<template>
	<v-expansion-panel>
		<v-expansion-panel-header disable-icon-rotate>
			Alterar senha
			<template v-slot:actions>
				<v-icon>security</v-icon>
			</template>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-form ref="changePasswordForm">
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field
								v-model="changePassword.oldPassword"
								label="Senha atual"
								:placeholder="String.fromCharCode(8206)"
								autocomplete="off"
								dense
								:type="changePasswordVisible ? 'text' : 'password'"
								:append-icon="changePasswordVisible ? 'material-icons visibility' : 'material-icons visibility_off'"
								@click:append="changePasswordVisible = !changePasswordVisible"
								@blur="revalidateForm()"
								:rules="[
									(v) => !!v || 'Senha atual obrigatoria',
								]"
							/>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field
								v-model="changePassword.newPassword"
								label="Nova Senha"
								:placeholder="String.fromCharCode(8206)"
								autocomplete="off"
								dense
								:type="changePasswordVisible ? 'text' : 'password'"
								:append-icon="changePasswordVisible ? 'material-icons visibility' : 'material-icons visibility_off'"
								@click:append="changePasswordVisible = !changePasswordVisible"
								@blur="revalidateForm()"
								:rules="[
									(v) => !!v || 'Nova senha obrigatoria',
									(v) => (v != changePassword.oldPassword) || 'Nova senha não pode ser igual a anterior',
								]"
							/>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field
								v-model="changePassword.newPasswordConfirm"
								label="Confirmação de senha"
								:placeholder="String.fromCharCode(8206)"
								autocomplete="off"
								dense
								:type="changePasswordVisible ? 'text' : 'password'"
								:append-icon="changePasswordVisible ? 'material-icons visibility' : 'material-icons visibility_off'"
								@click:append="changePasswordVisible = !changePasswordVisible"
								@blur="revalidateForm()"
								:rules="[
									(v) => !!v || 'Confirmação de senha obrigatoria',
									(v) => (v == changePassword.newPassword) || 'Senhas não coincidem',
								]"
							/>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="8" align="left">
						<span class="error--text" v-if="changePasswordError">
							Erro: {{ changePasswordError }}
						</span>
						<span class="success--text" v-if="changePasswordError === null">
							Senha trocada com sucesso
						</span>
					</v-col>
					<v-col cols="4" align="right">
						<v-btn color="primary" block @click="changePasswordSave()" align="right">Salvar</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>

export default {
	data: () => ({
		changePasswordLoading: false,
		changePasswordError: '',
		changePasswordVisible: false,
		changePassword: {
			oldPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
		},
	}),
	methods: {
		revalidateForm: function () {
			// Valida todos os inputs já preenchidos
			this.$refs.changePasswordForm.inputs.forEach((i) => i.isDirty && i.validate())

			// Zera a mensagem de erro
			this.changePasswordError = ''
		},
		changePasswordSave: function () {
			let self = this
			if (self.$refs.changePasswordForm.validate()) {
				self.changePasswordLoading = true
				self.$store.dispatch(
					'setPassword',
					{
						oldPassword: self.changePassword.oldPassword,
						newPassword: self.changePassword.newPassword
					}
				).then(
					function success (response) {
						self.$refs.changePasswordForm.reset()
						self.changePasswordError = null
					},
					function error (response) {
						let errors = {
							'auth/wrong-password': 'Senha atual não é válida',
							'auth/too-many-requests': 'Muitas tentativas inválidas, tente novamente mais tarde',
							'auth/weak-password': 'Senha muito fraca',
						}
						if (errors[response.code] === undefined) {
							console.log('Não foi encontrada tradução para a mensagem "' + response.code + '" - ' + response.message)
						}
						self.changePasswordError = errors[response.code] || response.message
					}
				).finally(() => (self.changePasswordLoading = false))
			}
		}
	},
}
</script>
