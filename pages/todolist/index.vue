<template lang="pug">
  .todolist
    v-card
      v-card-text.pt-2.pb-2
        v-layout(row)
          v-flex(xs4)
            lazy-text-field(:search-term.sync="searchTerm")
          v-spacer
      .modal
        v-dialog(v-model="dialog" max-width="500px")
          v-btn(
            fab
            color="primary"
            dark
            small
            right
            absolute
            slot="activator"
          )
            v-icon add
          v-card
            v-card-title
              span.headline {{ formTitle }}
            v-card-text
              v-container(grid-list-md)
                v-layout(row wrap)
                  v-flex(xs12)
                    v-text-field(v-model="editedItem.todo" label="TODO")
            v-card-actions
              v-spacer
              v-btn(
                color="grey darken-1"
                dark
                @click.native="close"
              ) Cancel
              v-btn(
                color="blue darken-1"
                @click.native="save"
                dark
              ) Save
        v-data-table.elevation-1(
          :headers="headers"
          :items="items"
        )
          template(
            slot="items"
            slot-scope="props"
          )
            td {{ props.item.todo }}
            td.justify-center.layout.px-0
              v-btn.mx-0(
                icon
                @click="openEdit(props.item)"
              )
                v-icon(color="teal") edit
              v-btn.mx-0(
                icon
                @click="deleteItem(props.item)"
              )
                v-icon(color="pink") delete
</template>

<script>
import LazyTextField from '@/components/LazyTextField'

export default {
  components: {
    LazyTextField
  },
  head: () => ({
    title: 'TODO List'
  }),
  async asyncData ({ app }) {
    const uri = 'https://5afee70fd0cc5b001479bfbc.mockapi.io/todolistcrud'

    let { data } = await app
      .$axios
      .get(uri)

    return { items: data }
  },
  data: () => ({
    route: '/todolist',
    uri: 'https://5afee70fd0cc5b001479bfbc.mockapi.io/',
    pagination: {
      rowsPerPage: -1
    },
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    headers: [
      { text: 'TODO', value: 'todo', align: 'left' },
      { text: 'Ações', value: 'acoes', align: 'center', sortable: false }
    ],
    dialog: false,
    items: [],
    editedIndex: -1,
    editedItem: {
      todo: ''
    },
    defaultItem: {
      todo: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New - TODO' : 'Edit - TODO'
    }
  },
  methods: {
    changeOrder (header) {
      if (this.pagination.sortBy === header.value) {
        this.pagination.descending = !this.pagination.descending
        return
      }

      this.pagination.sortBy = header.value
      this.pagination.descending = false
    },
    openEdit (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = {...item}
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = {...this.defaultItem}
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        this.editItem()
      } else {
        this.saveItem()
      }

      this.close()
    },
    editItem () {
      this
        .$swal(this.options)
        .then(() => {
          this.requestPut()
        })
    },
    saveItem () {
      this
        .$swal(this.options)
        .then(() => {
          this.requestPost()
        })
    },
    deleteItem (id) {
      this
        .$swal(this.options)
        .then(() => {
          this.requestDelete(id)
        })
    },
    requestDelete (id) {
      this
        .$axios
        .delete(`${this.uri}/todolistcrud/${id}`)
        .then(({ status }) => {
          if (status !== 204) {
            throw Error('Houve um erro ao excluír o registro.')
          }

          this.$swal('Done!', 'Removed', 'success')
        })
    },
    requestPut () {
      this
        .$axios
        .put(`${this.uri}/todolistcrud/${this.editedIndex}`, this.editedItem)
        .then(() => {
          this.$swal('Done!', 'Edited', 'success')
        })
    },
    requestPost (id) {
      this
        .$axios
        .post(`${this.uri}/todolistcrud/${this.editedIndex}`, this.editedItem)
        .then(() => {
          this.$swal('Done!', 'Saved', 'success')
        })
    }
  },
  watchQuery: [
    'searchTerm',
    'pagination'
  ]
}
</script>
