<template>
    <nav class="custom-nav">
        <ul>
            <li><a href="/guide/introduction/README">指南</a></li>
            <li><a href="/reference/api">参考</a></li>
            <li><a href="/example/markdown-examples">示例</a></li>
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