<template>
  <div class="container-card">
    <div class="card-image">
      <img
        src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />
    </div>
    <div class="card-content">
      <h3>China's cutthroat competition hasn't been lost with the slowdown</h3>

      <p>
        At least six Chinese electric car companies made product announcements in the last week.
      </p>

      <span>Published: </span>
    </div>
  </div>
</template>

<style scoped>
.container-card {
  width: 13rem;
}

.card-content {
  > p,
  span {
    color: var(--color-gray-200);
    margin-top: 1rem;
    display: block;
  }
}
.card-image {
  > img {
    width: 210px;
    height: 130px;
    border-radius: 1rem;
  }
}
</style>
