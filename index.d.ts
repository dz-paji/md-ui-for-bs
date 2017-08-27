import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $trans (key: string, placeholder = {}, escape = true): string
    $bs (uri: string, data = undefined): Promise<{ errno: number, msg: string }>
  }
}
