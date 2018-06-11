<template>
  <div v-if="shouldShow()" id="security-storage-warning" class="panel panel-danger">
    <div class="panel-heading">
      Security Blocks LocalStorage Access
    </div>
    <div class="panel-body">
      <p>
        Some features are blocked due to browser security settings preventing
        access to the browser's local storage. This is used to persist view
        settings and selected stories after a browser refresh.
      </p>

      <p>
        Please create an exception in the "Block third-party cookies and site
        data" to allow that feature.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['allowed'],
    methods: {
      shouldShow: function() {
        return this.$props.allowed == false
      }
    }
  };
</script>

<style scoped>

</style>
