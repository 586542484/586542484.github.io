<template>
    <div>
        <h1>文章归档</h1>
        <ul>
            <li v-for="post in posts" :key="post.url">
                <a :href="post.url">{{ post.title }}</a>
                <span class="ml">创建时间：{{ post.created.string }}</span>
                <span class="ml">更新时间：{{ post.updated.string }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { data as postsData } from '../theme/utils/guide.data';

const posts = ref([]);

onMounted(() => {
    console.log(postsData)
    posts.value = postsData;
});
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 1em 0;
}

.ml {
    margin-left: 1rem;
}
</style>