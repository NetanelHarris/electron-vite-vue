<template>
  <v-btn @click="openPortal()">Open</v-btn>
    <div v-if="open">
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopupWin',
    props: {
      open: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        windowRef: null,
      }
    },
    watch: {
      open(newOpen) {
        if(newOpen) {
          this.openPortal();
        } else {
          this.closePortal();
        }
      }
    },
    methods: {
      openPortal() {
        this.windowRef = window.open("", "", "width=1200,height=800,left=200,top=200");
        this.windowRef.addEventListener('beforeunload', this.closePortal);
        // magic!
        this.windowRef.document.body.appendChild(this.$el);
        // Get all stylesheets from the parent document
        const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
        // Append them to the popup's head
        // Create head element and add styles
        const head = this.windowRef.document.createElement('head');
        styles.forEach((style) => {
          head.appendChild(style.cloneNode(true));
        });
        this.windowRef.document.body.appendChild(head);
        this.$emit('open');

      },
      closePortal() {
        if(this.windowRef) {
          this.windowRef.close();
          this.windowRef = null;
          this.$emit('close');
        }
      }
    },
    mounted() {
      if(this.open) {
        this.openPortal();
      }
    },
    beforeUnmount() {
      if (this.windowRef) {
        this.closePortal();
      }
    }
  }
  </script>