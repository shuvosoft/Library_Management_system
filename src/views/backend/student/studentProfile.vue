<template>

    <div class="container-fluid">


      <div class="row page-titles">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active"><a href="javascript:void(0)">App</a></li>
          <li class="breadcrumb-item"><a href="javascript:void(0)">Profile</a></li>
        </ol>
      </div>
      <!-- row -->
      <div class="row">
        <div class="col-lg-12">
          <div class="profile card card-body px-3 pt-3 pb-0">
            <div class="profile-head">
              <div class="photo-content">
                <div class="cover-photo rounded"></div>
              </div>
              <div class="profile-info">
                <div class="user-image">
                  <form action="#" enctype="multipart/form-data" id="change_profile_form">
                    <label for="image">
                      <div class="profile-pic" >
                        <img
                            v-if="get_auth_info.image"
                            alt=""
                            :src="get_profile_image_url"
                            class="img-fluid"
                        />

                        <img  v-else src="/assets/images/profile/profile.png" class="img-fluid rounded-circle" alt="">
                        <span class="glyphicon glyphicon-camera"></span>
                        <span>Change Image</span>
                      </div>
                    </label>
                    <input
                        type="file"
                        id="image"
                        @change="change_profile"
                        name="image"
                        style="display: none"
                    />
                  </form>
                </div>
                <div class="profile-details">
                  <div class="profile-name px-3 pt-2">
                    <h4 class="text-primary mb-0">Student Name</h4>
                    <p>Student Email</p>
                  </div>
                  <div class="profile-email px-2 pt-2">
                    <h4 class="text-muted mb-0">{{get_auth_info.username}}</h4>
                    <p>{{ get_auth_info.email }}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="auth-form" style="background: white">
    <h4 class="text-center mb-4">Update Student Profile</h4>
    <form action="#" id="update_profile" @submit.prevent="update_profile">
      <div class="mb-3">
        <label class="mb-1" style="color: orangered"><strong>Username</strong></label>
        <input type="text" class="form-control" name="name" :value="get_auth_info.username">
      </div>
      <div class="mb-3">
        <label class="mb-1" style="color: orangered"><strong>Email</strong></label>
        <input type="email" class="form-control" name="email" :value="get_auth_info.email">
      </div>
      <div class="mb-3">
        <label class="mb-1"  style="color: orangered"><strong>Password</strong></label>
        <input type="password" class="form-control" name="password" placeholder="password">
      </div>
      <div class="mb-3">
        <label class="mb-1"  style="color: orangered"><strong>Confirm Password</strong></label>
        <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm password">
      </div>
      <div class="text-center">
        <button  class="btn btn-primary btn-block" >Update</button>
      </div>
    </form>
  </div>

</template>

<script>
import { mapGetters,mapMutations } from "vuex";

export default {
  name: "studentProfile",
  methods:{
    ...mapMutations(["set_auth_info"]),

    update_profile: function () {
      let form_data = new FormData(document.getElementById("update_profile"));
      window.axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${this.get_auth_token}`;
      window.axios.post("/user/student_update_profile", form_data).then((res) => {
        console.log(res.data);
        this.set_auth_info(res.data.user);
      });
    },
    change_profile: function () {
      let form_data = new FormData(
          document.getElementById("change_profile_form")
      );
      window.axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${this.get_auth_token}`;
      window.axios.post("/user/update-profile-pic", form_data).then((res) => {
        console.log(res.data);
        this.set_auth_info(res.data.user);
      });
    },
  },
  computed: {
    ...mapGetters(["get_auth_info", "get_auth_token","get_profile_image_url"]),
  },
}
</script>

<style scoped>
.profile-pic {
  border-radius: 50%;
  height: 108px;
  width: 122px;
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  vertical-align: middle;
  text-align: center;
  color: transparent;
  transition: all .3s ease;
  text-decoration: none;
  cursor: pointer;
}

.profile-pic:hover {
  background-color: rgba(0,0,0,.5);
  z-index: 10000;
  color: #fff;
  transition: all .3s ease;
  text-decoration: none;
}

.profile-pic span {
  display: inline-block;
  padding-top: 4.5em;
  padding-bottom: 4.5em;
}

form input[type="file"] {
  display: none;
  cursor: pointer;
}
</style>