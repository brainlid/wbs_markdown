<template>
  <div v-if="shouldShow()" id="invalid-story-warning" class="panel panel-danger">
    <div class="panel-heading">
      Invalid Story Links
    </div>
    <div class="panel-body">
      <p>
        The following story link names were used that don't match an
        existing story.
      </p>

      <ul class="text-danger">
        <li v-for="name in invalid">{{ name }}</li>
      </ul>

      <p>
        The work items will not show up because their story
        cannot be "selected" for them to show their work.
      </p>
      <p>
        You are looking for a work-item that links to an invalid story.
      <pre>
            {link="missing-story"}
            {link=invalid}
          </pre>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['invalid'],
    methods: {
      shouldShow: function() {
        return this.$props.invalid.length > 0
      }
    }
  };
</script>

<style scoped>

</style>
