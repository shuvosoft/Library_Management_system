<template>
  <div class="container-fluid">
    <!-- row -->
    <div class="row">
      <div class="col-xl-12 col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Book New Entry</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form action=""  @submit.prevent="saveEntry">
                <div class="input-group mb-3 input-warning-o">
                  <span class="input-group-text">Book Name</span>
                  <Select2
                      class="form-control"
                      v-model="myValue"
                      :options="myOptions"
                      :settings="{
										multiple: false,
										placeholder: `search user and select`,
										allowClear: true,
									}"
                      @change="myChangeEvent($event)"
                      @select="mySelectEvent($event)"
                  />
                </div>
                <div class="input-group mb-3 input-success-o">
                  <span class="input-group-text">Book Name</span>
                  <Select2
                      class="form-control"
                      v-model="myBooksValue"
                      :options="book_list_option"
                      :settings="{
										multiple: true,
										placeholder: `search book and select`,
										allowClear: true,
									}"
                      @change="myBookChangeEvent($event)"
                      @select="myBookSelectEvent($event)"
                  />
                </div>
                <div class="input-group mb-3 input-warning-o">
                  <span class="input-group-text">Time</span>
                  <input type="time" class="form-control" v-model="time" placeholder="Section">
                </div>
                <div class="input-group mb-3 input-success-o">
                  <span class="input-group-text">Entry date</span>
                  <input type="date" class="form-control" v-model="date" placeholder="Book Image">
                </div>
                <div class="input-group mb-3 input-success-o">
                  <span class="input-group-text">Return date</span>
                  <input type="date" class="form-control" v-model="return_date" placeholder="Book Image">
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
export default {
  name: "new-entry",
  data: function () {
    return {
      myValue: "",
      myBooksValue: "",
      // myOptions: ["op1", "op2", "op3"],
      myOptions: [],
      book_list_option: [],
      time:'',
      date: '',
      return_date:'',
    };
  },
  created: function(){
    this.getData();
  },
  methods: {
    getData: function () {
      window.axios.get('/user/user-list-for-select2')
          .then(res=>{
            this.myOptions = res.data;
          })
      window.axios.get('/book-list/book-list-for-select2')
          .then(res=>{
            console.log(res.data);
            this.book_list_option = res.data;
          })
    },
    myChangeEvent: function () {
      // console.log(val);
    },
    mySelectEvent: function () {
      // console.log({ id, text }, this.myValue);
    },

    myBookChangeEvent: function () {
      // console.log(val);
    },
    myBookSelectEvent: function () {
      // console.log({ id, text }, this.myBooksValue);
    },
    saveEntry: function(){
      let form_data = {
        user_id: this.myValue,
        book_ids: this.myBooksValue,
        date: this.date,
        return_date: this.return_date,
        time: this.time,
      }

      window.axios.post('/book-entry/create',form_data)
          .then(res=>{
            console.log(res.data);
            this.myBooksValue = [];
          })
    }
  },
};
</script>

<style scoped>

</style>