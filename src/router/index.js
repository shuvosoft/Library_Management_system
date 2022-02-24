import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/backend/Dashboard'
//admin
import admin from '../views/backend/Admin'
import adminLayout from '../views/backend/admin/adminLayout'
import bookEntry from '../views/backend/admin/bookentry'
import bookList from '../views/backend/admin/bookList'
import newEntry from '../views/backend/admin/newEntry'
import entryList from '../views/backend/admin/entryList'
import adminProfile from '../views/backend/admin/profile'
import userList from '../views/backend/admin/userList'
//student----------------
import Student from '../views/backend/Student'
import studentLayout from '../views/backend/student/studentLayout'
import studentBookList from '../views/backend/student/bookList'
import studentEntryDetails from '../views/backend/student/entryDetails'
import studentProfile from '../views/backend/student/studentProfile'


//Management------------
import Management from '../views/backend/Management'
import managementLayout from '../views/backend/management/managementLayout'
import managementBookList from '../views/backend/management/bookList'
import managementEntryList from '../views/backend/management/entryList'
import managementNewEntry from '../views/backend/management/newEntry'
import managementProfile from '../views/backend/management/profile'

//frontend-------------
import Login from '../views/frontend/Login'
import authLayout from '../views/frontend/Authlayout'
import Signup from '../views/frontend/Signup'
import Portfolio from '../views/frontend/Portfolio'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  //  admin ---------------------------------
  {
    path: "/admin",
    component: adminLayout,
    children: [
      {
        path: "",
        name: "admin",
        component: admin,
      },
      {
        path: "profile",
        name: "adminProfile",
        component: adminProfile,
      },
      {
        path: "users",
        name: "userList",
        component: userList,
      },
      {
        path: "book-list",
        name: "bookList",
        component: bookList,
      },
      {
        path: "book-entry",
        name: "bookEntry",
        component: bookEntry,
      },
      {
        path: "book-edit/:id",
        name: "bookEdit",
        component: bookEntry,
      },
      {
        path: "entry-list",
        name: "entryList",
        component: entryList,
      },
      {
        path: "new-entry",
        name: "newEntry",
        component: newEntry,
      },
    ],
  },

  //  management ---------------------------------
  {
    path: "/",
    component: managementLayout,
    children: [
      {
        path: '',
        name: 'management',
        component: Management
      },
      {
        path: "book-list",
        name: "managementBookList",
        component: managementBookList,
      },
      {
        path: "entry-list",
        name: "managementEntryList",
        component: managementEntryList,
      },
      {
        path: "new-entry",
        name: "managementNewEntry",
        component: managementNewEntry,
      },
      {
        path: "profile",
        name: "managementProfile",
        component: managementProfile,
      },
    ],
  },

  //  Student ---------------------------------
  {
    path: "/",
    component: studentLayout,
    children: [
      {
        path: 'Student',
        name: 'student',
        component: Student
      },
      {
        path: "profile",
        name: "studentProfile",
        component: studentProfile,
      },
      {
        path: "book-list",
        name: "studentBookList",
        component: studentBookList,
      },
      {
        path: "entry-details/:id",
        name: "studentEntryDetails",
        component: studentEntryDetails,
      },
    ],
  },

  // Frontend -----------------------------------
  {
    path: "/vue_library_frontend",
    component: authLayout,
    children: [
      {
        path: '/Login',
        name: 'login',
        component: Login
      },
      {
        path: '/Signup',
        name: 'signup',
        component: Signup
      },
      {
        path: '/Portfolio',
        name: 'portfolio',
        component: Portfolio
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
