<template>
  <div class="mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card px-5 py-4">

          <div class="text-center mb-4">
            <h4>Login</h4>
          </div>

          <div class="forms-inputs mb-4">
            <span>Email</span>
            <input type="text" v-model="email"
             :class="{'form-control': true, 'is-invalid' : !validEmail(email) && emailBlured}"
             @blur="emailBlured = true">
            <div class="invalid-feedback">A valid email is required!</div>
          </div>

          <div class="forms-inputs mb-4">
            <span>Password</span>
            <input type="password" v-model="password"
             :class="{'form-control': true, 'is-invalid' : !validPassword(password) && passwordBlured}"
             @blur="passwordBlured = true">
            <div class="invalid-feedback">Password is required!</div>
          </div>

          <div class="forms-inputs mb-4">
            <button @click.stop.prevent="login" class="btn btn-dark w-100">Login</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <Modal :title="modalTitle" v-if="showModal" @close="closeBtnAction">
    <p v-text="modalText"></p>
  </Modal>
</template>

<script>
import validator from 'validator';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Login',
  components: {
    Modal
  },
  data() {
    return {
      valid: false,
      email: "",
      emailBlured : false,
      password: "",
      passwordBlured:false,
      showModal: false,
      modalTitle: '',
      modalText: '',
      closeBtnAction: null
    }
  },
  methods: {
    validEmail: (email) => validator.isEmail(email),
    validPassword: (password) => password.length,

    validate() {
      this.emailBlured = true;
      this.passwordBlured = true;
      if (this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
      else {
        this.valid = false;
      }
    },

    login() {
      this.validate();

      const successMsg = () => {
        this.modalTitle = 'Success!';
        this.modalText = 'You successfully logged in!';
        this.showModal = true;
        this.closeBtnAction = () => this.$router.push('/');
      };

      const failureMsg = () => {
        this.modalTitle = 'Failure!';
        this.modalText = 'You failed to login.';
        this.showModal = true;
        this.closeBtnAction = () => this.showModal = false;
      };

      if (this.valid) {
        const requestData = {
          email: this.email,
          password: this.password
        };

        this.$store.dispatch('login', requestData)
          .then(() => successMsg())
          .catch(() => failureMsg());
      }
      else {
        failureMsg();
      }
    }
  }
}
</script>

<style lang="scss">
  .forms-inputs input:focus {
      border: 2px solid #000
  }
</style>
