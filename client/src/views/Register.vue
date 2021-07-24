<template>
  <div class="mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card px-5 py-4">
          <div class="form-data" v-if="!submitted">

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

            <div class="mb-3">
              <button @click.stop.prevent="submit" class="btn btn-dark w-100">Register</button>
            </div>

          </div>
          <div class="success-data" v-else>

            <div class="text-center d-flex flex-column">
              <span class="text-center">You have been successfully registered!</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validator from 'validator';

export default {
  name: 'Register',
  data() {
    return {
      valid : false,
      submitted : false,
      firstname: "",
      firstnameBlured: false,
      lastname: "",
      lastnameBlured: false,
      email : "",
      emailBlured : false,
      password:"",
      passwordBlured:false,
    }
  },
  methods: {
    validate() {
      this.firstnameBlured = true;
      this.lastnameBlured = true;
      this.emailBlured = true;
      this.passwordBlured = true;
      if (this.validName(this.firstname) && this.validName(this.lastname) && this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
    },

    validEmail: (email) => validator.isEmail(email),
    //validPassword: (password) => validator.isStrongPassword(password, { minLength: 8 }),
    validPassword: (password) => password.length > 7,
    validName: (name) => validator.isAlpha(name) && name.length,

    submit() {
      this.validate();
      if (this.valid) {
        this.submitted = true;
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
