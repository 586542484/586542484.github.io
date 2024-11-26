<template>
    <nav class="custom-nav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/guide/introduction/README">介绍</a></li>
            <li><a href="/guide/usage/basic">入门</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'MyCustomComponent'
}
</script>

<style scoped>
.custom-nav {
    background-color: #f8f9fa;
    padding: 10px;
}

.custom-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.custom-nav li {
    margin-right: 15px;
}

.custom-nav a {
    text-decoration: none;
    color: #007bff;
}

.custom-nav a:hover {
    text-decoration: underline;
}
</style>