<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Book List</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table primary-table-bg-hover table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Section</th>
              <th class="text-center" style="width: 20%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(book,imdex) in book_list.data" :key="book.id">
              <th>{{imdex}}</th>

              <td>
                <img
                    v-if="book.image.split('/')[0] === 'upload'"
                    :src="`${get_server_url}/${book.image}`"
                    style="height: 70px"
                    alt="image"
                />
                <img
                    v-else
                    :src="`http://${book.image}`"
                    style="height: 70px"
                    alt="image"
                />
              </td>

              <td>{{book.name}}</td>
              <td>{{book.author}}</td>
              <td>{{book.section}}</td>
              <td>
                <router-link
                    :to="{ name: 'bookEdit', params: { id: book.id } }"
                    class="btn btn-sm btn-warning mx-1"
                >Edit</router-link
                >
                <a
                    href="#"
                    @click.prevent="delete_book(book, index)"
                    class="btn btn-sm btn-danger mx-1"
                >Delete</a>
              </td>
            </tr>

            </tbody>
          </table>
          <div class="card-footer">
            <pagination v-model="page" :records="total" :per-page="per_page" @paginate="getData"/>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "bookList",
  data(){
    return{
      book_list:{},
      page: 1,
      per_page: 0,
      total: 0,
    }
  },
  created: function () {
    this.getData();
  },
methods:{
  //Show all Book List-----------------
  getData(page = 1) {
    let url = `/book-list?page= ${page}`;

    window.axios.get(url).then((res) => {
      // console.log(res.data);
      this.book_list = res.data;
      this.total = res.data.total;
      this.per_page = res.data.per_page;
    });
  },

  //Delete Book ---------------------
  delete_book(book, index){
    let con = confirm("sure want to delete??");
    console.log(index);
    if (con) {
      window.axios.post("/book-list/delete", { id: book.id }).then((res) => {
        console.log(res.data);
        // this.book_list.data.splice(index,1);
        this.getData();
      });
    }
  }
},
  computed:{
    ...mapGetters(["get_server_url"]),
  }
}
</script>

<style scoped>

</style>