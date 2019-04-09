<template>
  <div class="modal" :class="{ on: isFilterOn }" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">필터</h5>
          <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <b-form-checkbox
            v-for="category in categories"
            v-model="checkedCategories"
            :key="category.no"
            :value="category.name"
          >
            {{category.name}}
          </b-form-checkbox>
        </div>
        <div class="modal-footer">


          <button @click="handleCategories" type="button" class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: [
    'categories',
    'selectedCategories',
    'isFilterOn',
  ],
  data() {
    return {
      checkedCategories: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setCheckedCategories();
    });
  },
  methods: {
    handleCategories() {
      console.log('save');
      if (this.checkedCategories.length === 0) {
        alert('카테고리를 최소 1개는 선택해주세요.');
      } else {
        this.$emit('handle-category', this.checkedCategories);
        this.close();
      }
    },
    close() {
      console.log('close');
      this.$emit('handle-modal', this.isFilterOn);
    },
    setCheckedCategories() {
      this.selectedCategories.forEach((category) => {
        this.checkedCategories.push(category.name);
      });
    },
  },
};
</script>
