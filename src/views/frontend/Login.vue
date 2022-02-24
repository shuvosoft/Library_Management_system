<template>
  <div class="auth-form">
    <div class="text-center mb-3">
      <a href="index.html"><img src="/assets/images/logo-full.png" alt=""></a>
    </div>
  <h4 class="text-center mb-4">Log in your account</h4>
  <form action="" id="login_from" @submit.prevent="login_submit">
      <div class="mb-3">
        <label class="mb-1"><strong>Email</strong></label>
        <input type="email" class="form-control" name="email" value="">
      </div>
      <div class="mb-3">
        <label class="mb-1"><strong>Password</strong></label>
        <input type="password" class="form-control" name="password" value="">
      </div>

      <div class="card-body" >
        <div class="mb-3" style="text-align: center">
          <button type="button" class="btn btn-primary" style="margin-right: 15px" @click.prevent="login(true,'student')">Student</button>
          <button type="button" class="btn btn-secondary" style="margin-right: 15px" @click.prevent="login(true,'admin')">Admin</button>
          <button type="button" class="btn btn-success" style="margin-right: 15px" @click.prevent="login(true,'management')">Management</button>
         </div>
      </div>

      <div class="row d-flex justify-content-between mt-4 mb-2">
        <div class="mb-3">
          <div class="form-check custom-checkbox ms-1">
            <input type="checkbox" class="form-check-input" id="basic_checkbox_1">
            <label class="form-check-label" for="basic_checkbox_1"  style="color: orangered">Remember my preference</label>
          </div>
        </div>
        <div class="mb-3">
          <a href="page-forgot-password.html"  style="color: orangered">Forgot Password?</a>
        </div>
      </div>

    <div class="text-center">
      <button type="submit" class="btn btn-primary btn-block" >Sign Me In</button>
    </div>
  </form>

  <div class="new-account mt-3">
    <p style="color: orangered">Don't have an account? <router-link :to="{name:'signup'}" class="text-primary" style="font-size: 16px">Sign up</router-link></p>
  </div>
  </div>
</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "Login",
  methods:{
    ...mapMutations([
        'set_auth_role_name',
        'set_check_auth_status',
        "set_auth_token",
        "set_auth_info",
    ]),
    login(status,role_name){
      this.set_auth_role_name(role_name);
      this.set_check_auth_status(status);
    },

    login_submit(){
      let form_data = new FormData(document.getElementById("login_from"));
      window.axios.post("/user/login", form_data)
      .then((res)=>{
        this.set_auth_token({ token: res.data.access_token });
        this.set_auth_info(res.data.user);
      })
    }
  }
}
</script>

<style scoped>

</style>