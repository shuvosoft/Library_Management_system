<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Book List</h4>
      </div>

      <div class="card-body">
        <div class="input-group search-area">
          <input type="text" class="form-control" @keyup="search($event.target.value)" placeholder="Search ..." style="background: palegoldenrod;">
          <span class="input-group-text"><a ><i class="flaticon-381-search-2"></i></a></span>
          <button v-if="selected_data.length > 0" @click.prevent="delete_multiple()" class="btn btn-success mb-2" style="margin: -2px 95px;">Delete Selected ( {{ selected_data.length }} )</button>
        </div>

        <div class="table-responsive">
          <table class="table primary-table-bg-hover table-bordered">
            <thead>
            <tr>
              <th>
                <input type="checkbox"  @click="check_all()" id="check_all" class="form-check"/>
              </th>
              <th>#</th>
              <th>Image</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Section</th>
              <th class="text-center" style="width: 20%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(book,index) in book_list.data" :key="book.id">
              <td>
<!--                <input type="checkbox" @change="add_to_selected(book.id)" class="form-check"/>-->
                <input
                    v-if="selected_data.includes(book.id)"
                    checked
                    type="checkbox"
                    @change="add_to_selected(book.id)"
                    class="form-check"
                />
                <input
                    v-else
                    type="checkbox"
                    @change="add_to_selected(book.id)"
                    class="form-check"
                />
              </td>
              <td>{{index}}</td>

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
      search_key: "",
      selected_data: [],
    }
  },
  created: function () {
    this.getData();
  },
methods:{
  //Show all Book List-----------------
  getData(page = 1) {
    let url = `/book-list?page= ${page}`;
    if (this.search_key.length > 0) {   //this condition only for search
      url += `&key=${this.search_key}`;
    }
    window.axios.get(url).then((res) => {
      console.log(res.data);
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
  },

// Start  Multi select Delete using check box---------------

  add_to_selected: function (id) {
    this.selected_data.includes(id)
        ? (this.selected_data = this.selected_data.filter((item) => item != id))
        : this.selected_data.push(id);

    console.log(this.selected_data);
  },
  check_all(){
    this.book_list.data.map((item) => {
      this.selected_data.includes(item.id)
          ? (this.selected_data = this.selected_data.filter(
              (item2) => item2 != item.id
          ))
          : this.selected_data.push(item.id);

      return 0;
    });
  },
  delete_multiple(){
    let con = confirm("sure want to delete??");
    if (con) {
      window.axios
          .post("/book-list/delete-multi", { ids: this.selected_data })
          .then((res) => {
            console.log(res.data);
            this.selected_data = [];
            this.getData();
            window.$("#check_all").prop("checked", false);
          });
    }
  },
// end Multi select Delete using check box ---------------------------
// Search ................
  search(key){
    console.log(key)
    this.search_key = key;
    this.getData();
  }
// End Search ................
},
  computed:{
    ...mapGetters(["get_server_url"]),
  }
}
</script>

<style scoped>

</style>