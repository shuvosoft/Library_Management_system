<template>
  <div class="dlabnav">
    <div class="dlabnav-scroll">
      <div class="dropdown header-profile2 ">
        <a class="nav-link " href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
          <div class="header-info2 d-flex align-items-center">
            <img src="/assets/images/profile/pic1.jpg" alt="">
            <div class="d-flex align-items-center sidebar-info">
              <div>
                <span class="font-w400 d-block">Franklin Jr</span>
                <small class="text-end font-w400">Superadmin</small>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>

          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a href="app-profile.html" class="dropdown-item ai-icon ">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span class="ms-2">Profile </span>
          </a>
          <a href="email-inbox.html" class="dropdown-item ai-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-success" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span class="ms-2">Inbox </span>
          </a>
          <a href="page-error-404.html" class="dropdown-item ai-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span class="ms-2">Logout </span>
          </a>
        </div>
      </div>
      <ul class="metismenu" id="menu">
        <li v-if="get_auth_role_name == 'admin'">
          <a class="has-arrow " href="#" aria-expanded="false">
            <i class="flaticon-025-dashboard"></i>
            <span class="nav-text">Admin Dashboard</span>
          </a>
          <ul aria-expanded="false">
            <li><router-link :to="{name:'adminProfile'}">Home</router-link></li>
            <li><router-link :to="{name:'userList'}">Users</router-link></li>
            <li><router-link :to="{name:'bookList'}">Book List</router-link></li>
            <li><router-link :to="{name:'bookEntry'}">Book Entry</router-link></li>
            <li><router-link :to="{name:'entryList'}">Entry List</router-link></li>
            <li><router-link :to="{name:'newEntry'}">New Entry</router-link></li>

          </ul>
        </li>

        <li v-if="get_auth_role_name == 'student'">
          <a class="has-arrow " href="#" aria-expanded="false">
            <i class="flaticon-025-dashboard"></i>
            <span class="nav-text">Student Dashboard</span>
          </a>
          <ul aria-expanded="false">
            <li><router-link :to="{name:'studentProfile'}">Profile</router-link></li>
            <li><router-link :to="{name:'studentBookList'}">Book List</router-link></li>
          </ul>
        </li>
        <li v-if="get_auth_role_name == 'management'">
          <a class="has-arrow " href="#" aria-expanded="false">
            <i class="flaticon-025-dashboard"></i>
            <span class="nav-text">Management Dashboard</span>
          </a>
          <ul aria-expanded="false">
            <li><router-link :to="{name:'managementProfile'}">Profile</router-link></li>
            <li><router-link :to="{name:'managementBookList'}">Book List</router-link></li>
            <li><router-link :to="{name:'managementEntryList'}">Entry List</router-link></li>
            <li><router-link :to="{name:'managementNewEntry'}">New Entry</router-link></li>
          </ul>
        </li>
        <li>
          <a class="has-arrow " href="#" @click.prevent="get_logout()" aria-expanded="false">
            <i class="flaticon-093-waving"></i>
            <span class="nav-text">Log Out</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import {mapMutations,mapGetters} from "vuex";
export default {
  name: "Sidebar",
  created() {
    this.init_jq();
  },
  methods:{
    get_logout(){
      //   window.axios.get("/user/logout").then((res) => {
      //   console.log(res.data);
      // });
      this.$router.replace({path:'login'});
      this.setLogout();
    },
    ...mapMutations([
      'setLogout'
    ]),
    init_jq(){
      function JobickCarousel()
      {
        /*  testimonial one function by = owl.carousel.js */
        $('.front-view-slider').owlCarousel({
          loop:false,
          margin:30,
          nav:true,
          autoplaySpeed: 3000,
          navSpeed: 3000,
          autoWidth:true,
          paginationSpeed: 3000,
          slideSpeed: 3000,
          smartSpeed: 3000,
          autoplay: false,
          animateOut: 'fadeOut',
          dots:true,
          navText: ['', ''],
          responsive:{
            0:{
              items:1
            },

            480:{
              items:1
            },

            767:{
              items:3
            },
            1750:{
              items:3
            }
          }
        })
      }

      $(window).on('load',function(){
        setTimeout(function(){
          JobickCarousel();
        }, 1000);
      });
    }
  },
  computed: {
    ...mapGetters([
      "get_auth_role_name",
      "get_check_auth_status",
    ]),
  },
}
</script>

<style scoped>

</style>