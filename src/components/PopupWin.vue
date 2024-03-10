<template>
  <v-btn @click="openPortal()">Open</v-btn>
  <div>
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
      if (newOpen) {
        this.openPortal();
      } else {
        this.closePortal();
      }
    }
  },
  methods: {
    openPortal() {
      // Get all html from the component
      /**
       * @type {HTMLElement}
       */
      const html = this.$el;
      // Get all stylesheets from the parent document
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      // get html from styles
      let stylesHtml = '';
      styles.forEach((style) => {
        if (style.tagName === 'STYLE') {
          stylesHtml += style.outerHTML;
        } else {
          stylesHtml += `<link rel="stylesheet" href="${style.href}" />`;
        }
      });
      // Add styles to the html
      const finalHtml = `
          <html>
            <head>
              ${stylesHtml}
            </head>
            <body>
              ${html}
            </body>
          </html>
        `;
      ipcRenderer.invoke('open-window', finalHtml).then((result) => {
      });


    },
    closePortal() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef = null;
        this.$emit('close');
      }
    }
  },
  mounted() {
    if (this.open) {
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