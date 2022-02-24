<template>
  <div>

    <!--*******************
        Preloader start
    ********************-->
<!--    <div id="preloader">-->
<!--      <div class="lds-ripple">-->
<!--        <div></div>-->
<!--        <div></div>-->
<!--      </div>-->
<!--    </div>-->
    <!--*******************
        Preloader end
    ********************-->

    <!--**********************************
        Main wrapper start
    ***********************************-->
    <div id="main-wrapper">

      <!--**********************************
          Nav header start
      ***********************************-->
      <headers></headers>
      <!--**********************************
          Nav header end
      ***********************************-->
      <!--**********************************
          Sidebar start
      ***********************************-->
      <sidebars></sidebars>
      <!--**********************************
          Sidebar end
      ***********************************-->

      <!--**********************************
              Content body start
          ***********************************-->
         <div class="content-body">
        <!-- row -->
           <router-view/>
        </div>
      <!--**********************************
          Content body end
      ***********************************-->



      <!--**********************************
          Footer start
      ***********************************-->
    <footers></footers>
      <!--**********************************
          Footer end
      ***********************************-->

      <!--**********************************
             Support ticket button start
          ***********************************-->

      <!--**********************************
         Support ticket button end
      ***********************************-->


    </div>
    <!--**********************************
        Main wrapper end
    ***********************************-->
  </div>

</template>

<script>
import headers from '../../components/backend/Header'
import sidebars from '../../components/backend/Sidebar'
import footers from '../../components/backend/Footer'

export default {
  name: "Dashboard",
  components:{
    headers,
    sidebars,
    footers
  },

}
</script>

<style scoped>

</style>