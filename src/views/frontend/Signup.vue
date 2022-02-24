<template>
  <div class="auth-form">
    <div class="text-center mb-3">
      <a href="index.html"><img src="/assets/images/logo-full.png" alt=""></a>
    </div>
    <h4 class="text-center mb-4">Sign up your account</h4>
    <form id="signup_form"  @submit.prevent="signup_submit">
      <div class="mb-3">
        <label class="mb-1"><strong>Username</strong></label>
        <input type="text" class="form-control" placeholder="username" name="name">
      </div>
      <div class="mb-3">
        <label class="mb-1"><strong>Email</strong></label>
        <input type="email" class="form-control" name="email" placeholder="hello@example.com">
      </div>
      <div class="mb-3">
        <label class="mb-1"><strong>Password</strong></label>
        <input type="password" class="form-control" name="password" placeholder="Password">
      </div>
      <div class="mb-3">
        <label class="mb-1"><strong>Retype Password</strong></label>
        <input type="password" class="form-control" name="password_confirmation" placeholder="Retype Password">
      </div>
      <div class="text-center mt-4">
        <button type="submit" class="btn btn-primary btn-block">Sign me up</button>
      </div>
    </form>

    <div class="new-account mt-3">
      <p style="color: orangered">Already have an account? <router-link class="text-primary" :to="{name:'login'}"  style="font-size: 16px">Sign in</router-link></p>
    </div>

  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Signup",
  methods:{
    ...mapMutations([
      "set_auth_token",
      "set_auth_info",
    ]),
    signup_submit(){
      let form_data = new FormData(document.getElementById('signup_form'))
      window.axios.post("/user/register", form_data)
          .then((res)=>{
            console.log(res.data)
            this.set_auth_token({ token: res.data.access_token });
            this.set_auth_info(res.data.user);
          })
      .then((err)=>{
        console.log(err.response);
      })
    }
  }
}
</script>

<style scoped>
h3{
color:#000;
}
</style>