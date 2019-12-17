<template>
  <div>
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <px-assets-table v-bind:assets="assets"></px-assets-table>
  </div>
</template>
<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",
  components: {
    PxAssetsTable
  },
  data() {
    return {
      isLoading: false,
      assets: []
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  }
};
</script>
