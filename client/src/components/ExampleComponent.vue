<template>
  <div>
    <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent',
  props: {
    msg: String
  }
}
</script>
