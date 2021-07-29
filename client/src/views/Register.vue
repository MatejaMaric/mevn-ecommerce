<template>
  <div class="mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card px-5 py-4">
          <div class="form-data">

            <div class="text-center mb-4">
              <h4>Register</h4>
            </div>

            <div class="forms-inputs mb-4">
              <span>First name</span>
              <input type="text" v-model="firstname"
                :class="{'form-control':true, 'is-invalid' : !validName(firstname) && firstnameBlured}"
                @blur="firstnameBlured = true">
              <div class="invalid-feedback">A valid first name is required!</div>
            </div>

            <div class="forms-inputs mb-4">
              <span>Last name</span>
              <input type="text" v-model="lastname"
                :class="{'form-control':true, 'is-invalid' : !validName(lastname) && lastnameBlured}"
                @blur="lastnameBlured = true">
              <div class="invalid-feedback">A valid last name is required!</div>
            </div>

            <div class="forms-inputs mb-4">
              <span>Email</span>
              <input type="text" v-model="email"
                :class="{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}"
                @blur="emailBlured = true">
              <div class="invalid-feedback">A valid email is required!</div>
            </div>

            <div class="forms-inputs mb-4">
              <span>Password</span>
              <input type="password" v-model="password"
                :class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}"
                @blur="passwordBlured = true">
              <div class="invalid-feedback">Password must be 8 character!</div>
            </div>

            <div class="forms-inputs mb-4">
              <span>Confirm Password</span>
              <input type="password" v-model="passwordConfirm"
                :class="{'form-control':true, 'is-invalid' : (password !== passwordConfirm) && passwordConfirmBlured}"
                @blur="passwordConfirmBlured = true">
              <div class="invalid-feedback">Passwords must match!</div>
            </div>

            <div class="mb-3">
              <button @click.stop.prevent="submit" class="btn btn-dark w-100">Register</button>
            </div>

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
  name: 'Register',
  components: {
    Modal
  },
  data() {
    return {
      valid : false,
      firstname: "",
      firstnameBlured: false,
      lastname: "",
      lastnameBlured: false,
      email : "",
      emailBlured : false,
      password:"",
      passwordBlured:false,
      passwordConfirm:"",
      passwordConfirmBlured:false,
      showModal: false,
      modalTitle: '',
      modalText: '',
      closeBtnAction: null
    }
  },
  methods: {
    validate() {
      this.firstnameBlured = true;
      this.lastnameBlured = true;
      this.emailBlured = true;
      this.passwordBlured = true;
      this.passwordConfirmBlured = true;
      if (this.validName(this.firstname) && this.validName(this.lastname)
          && this.validEmail(this.email) && this.validPassword(this.password)
          && this.password === this.passwordConfirm) {
        this.valid = true;
      }
      else {
        this.valid = false;
      }
    },

    validEmail: (email) => validator.isEmail(email),
    //validPassword: (password) => validator.isStrongPassword(password, { minLength: 8 }),
    validPassword: (password) => password.length > 7,
    validName: (name) => validator.isAlpha(name) && name.length,

    submit() {
      this.validate();

      const successMsg = () => {
        this.modalTitle = 'Success!';
        this.modalText = 'You successfully registered!';
        this.showModal = true;
        this.closeBtnAction = () => this.$router.push('/');
      };

      const failureMsg = () => {
        this.modalTitle = 'Failure!';
        this.modalText = 'You failed to register.';
        this.showModal = true;
        this.closeBtnAction = () => this.showModal = false;
      };

      if (this.valid) {
        const requestData = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          confirmPassword: this.passwordConfirm,
        };

        this.$store.dispatch('register', requestData)
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
