<template>
  <div class="container-fluid">
    <!-- row -->
    <div class="row">
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Book Entry</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form action="" id="book_form" @submit.prevent="save_book" enctype="multipart/form-data">
                <div class="input-group mb-3 input-warning-o">
                  <span class="input-group-text">Book Name</span>
                  <input type="text" class="form-control"  name="name" placeholder=" Book Name">
                </div>
                <div class="input-group mb-3 input-success-o">
                  <span class="input-group-text">Author Name</span>
                  <input type="text" class="form-control" name="author" placeholder="Author name">
                </div>
                <div class="input-group mb-3 input-warning-o">
                  <span class="input-group-text">Section Name</span>
                  <input type="text" class="form-control" name="section" placeholder="Section">
                </div>
                <div class="input-group mb-3 input-success-o">
                  <span class="input-group-text">Book Image</span>
                  <input type="file" class="form-control" name="image" placeholder="Book Image">
                </div>

                <button type="submit" class="btn btn-primary mt-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "bookentry",
  data(){
    return{
        id: 0,
       url: "/book-list/store",
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.id = parseInt(this.$route.params.id)
    if (this.id > 0){
      this.get_book();
      this.url = "/book-list/update";
    }

  },
  methods:{
    //For update .... get data parent id wise
    get_book(){
      window.axios.get('/book-list/get/' + this.id)
      .then((res)=>{
        console.log(res.data)
        for (const key in res.data) {
          if (Object.hasOwnProperty.call(res.data, key)) {
            const element = res.data[key];
            if (key != "image") {
              window.$(`input[name="${key}"`).val(element);
            }
          }
        }
      })
    },
//for Only Store book Data ----------------------
    // save_book(){
    //   let form_data = new FormData(document.getElementById("book_form"))
    //   window.axios.post("/book-list/store/",form_data)
    //       .then((res)=>{
    //         console.log(res.data);
    //         this.$router.push({ name: "bookList" });
    //       }).catch((err) =>{
    //     console.log(err.response)
    //   })
    // },

//for Store and update book Data ----------------------
    save_book(){
      let form_data = new FormData(document.getElementById("book_form"))
      if (this.url === "/book-list/update") {
        form_data.append("id", this.id);
      }
      window.axios.post(this.url,form_data)
      .then((res)=>{
        console.log(res.data);
        this.$router.push({ name: "bookList" });
      }).catch((err) =>{
        console.log(err.response)
      })
    }
  },
  computed:{
    ...mapGetters(["get_server_url"]),
  }

}
</script>

<style scoped>

</style>