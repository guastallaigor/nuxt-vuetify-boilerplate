<template lang="pug">
  .todolist
    v-card
      v-card-text.pt-2.pb-2
        v-layout(row)
          v-flex(xs4)
            lazy-text-field(:search-term.sync="searchTerm")
          v-spacer
      .modal
        v-dialog(
          v-model="dialog"
          max-width="500px"
        )
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
                    v-text-field(
                      v-model="editedItem.todo"
                      label="TODO"
                    )
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
          no-data-text="Nothing to do"
          no-results-text="Nothing to do"
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
                @click="deleteItem(props.item.id)"
              )
                v-icon(color="pink") delete
</template>

<script>
import LazyTextField from '@/components/LazyTextField'
import TODOService from '@/services/TODOService'

export default {
  name: 'todolist',
  components: {
    LazyTextField
  },
  head: () => ({
    title: 'TODO List'
  }),
  async asyncData ({ query }) {
    const params = {
      search: query.search || ''
    }
    const { data } = await TODOService.getList(params)

    return { items: data }
  },
  data: () => ({
    items: [],
    searchTerm: '',
    headers: [
      { text: 'TODO', value: 'todo', align: 'left' },
      { text: 'Ações', value: 'acoes', align: 'center', sortable: false }
    ],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      todo: ''
    },
    defaultItem: {
      todo: ''
    },
    options: {
      title: 'Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: true
    }
  }),
  computed: {
    formTitle () {
      return (this.editedIndex === -1 ? 'New - TODO' : 'Edit - TODO')
    }
  },
  methods: {
    reloadData () {
      let params = {}
      if (this.searchTerm) {
        params.search = this.searchTerm
      }

      TODOService
        .getList(params)
        .then(({ data }) => {
          this.items = data
        })
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
      this.requestPut()
    },
    saveItem () {
      this.requestPost()
    },
    deleteItem (id) {
      this
        .$swal(this.options)
        .then((willDelete) => {
          if (willDelete) {
            this.requestDelete(id)
          }
        })
    },
    requestDelete (id) {
      TODOService
        .deleteTODO(id)
        .then(() => {
          this.success('Removed!')
        })
    },
    requestPut () {
      TODOService
        .editTODO(this.editedItem)
        .then(() => {
          this.success('Edited')
        })
    },
    requestPost () {
      TODOService
        .saveTODO(this.editedItem)
        .then(() => {
          this.success('Saved!')
        })
    },
    success (message) {
      this.$swal(message, 'Success', 'success')
      this.reloadData()
    }
  },
  watch: {
    searchTerm (newValue) {
      const search = newValue

      this
        .$router
        .push({
          name: 'todolist',
          query: { search }
        })

      this.reloadData()
    }
  }
}
</script>
