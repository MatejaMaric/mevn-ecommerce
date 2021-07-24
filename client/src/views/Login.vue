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
</template>

<script>
import validator from 'validator';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: "",
      emailBlured : false,
      password: "",
      passwordBlured:false
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
    },

    login() {
      this.validate();
      if (this.valid) {
        alert('Successfully logged in!');
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
