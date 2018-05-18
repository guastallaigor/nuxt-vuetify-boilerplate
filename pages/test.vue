<template lang="pug">
  v-container.teste(grid-list-lg)
    v-card
      v-card-text
        v-layout(column align-center justify-center)
          v-flex
            nuxt-logo
          v-flex.text-xs-center
            p Page rendered in: {{ name }}.
            p The title has changed to Test.
            nuxt-link(to="/inspire") Links are different, they're called nuxt-link
</template>

<script>
import NuxtLogo from '@/components/NuxtLogo'

export default {
  components: {
    NuxtLogo
  },
  // asyncData: () => ({
  //   name: process.static ? 'static' : (process.server ? 'server' : 'client')
  // }),
  // asyncData: ({ req, params, store }) => ({
  //   name: req ? 'server' : 'client'
  // }),
  async asyncData ({ req, params, env }) {
    let name = req ? 'server' : 'client'
    console.log(env)
    // tem como usar await aqui
    return { name }
  },
  // head: {
  //   title: 'Teste'
  // }
  head: () => ({
    title: 'Test'
  })
}
</script>

<style lang="stylus">
.teste
  font-size 1.5rem
  font-weight bold
  background linear-gradient(to left, #41B883, #35495E)
</style>
