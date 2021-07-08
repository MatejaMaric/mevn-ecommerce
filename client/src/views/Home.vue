<template>
  <div>
    <ExampleComponent msg="Example text inside example component."/>
  </div>
</template>

<script>
import ExampleComponent from '@/components/ExampleComponent';
export default {
  name: 'Home',
  components: {
    ExampleComponent
  }
}
</script>
