<script setup lang="ts">

// get props 
const props = defineProps({
    text: {
        type: String,
        required: true,
        default: 'Hello World'
    }
})



let editor = useEditor({
    content: `${props.text}`,
    extensions: [TiptapStarterKit],
})
</script>
<template>
    <div v-if="editor" class="flex gap-3">
        <UButton :variant="editor.isActive('bold') ? 'soft' : 'outline'" @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()" color="blue">
            b
        </UButton>
        <UButton :variant="editor.isActive('italic') ? 'soft' : 'outline'"
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()" color="blue">
            i
        </UButton>
        <UButton :variant="editor.isActive('strike') ? 'soft' : 'outline'"
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()" color="blue">
            strike
        </UButton>
    </div>

    <div class="ring-1 ring-gray-300 rounded-sm max-h-20 overflow-y-auto">
        <TiptapEditorContent :editor="editor" class=" overflow-y-auto" />
    </div>
</template>

<style >
.tiptap {
    overflow: hidden;
}

.tiptap p {
    padding: 5px;
    margin: 5px;
}
</style>