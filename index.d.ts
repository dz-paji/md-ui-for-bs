import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $trans (key: string, placeholder = {}, escape = true): string
    $bs (
      uri: string,
      data?,
      options?: {
        success? (resData: { errno?: number, msg?: string }),
        error? (resData: { errno?: number, msg?: string }),
        useToast? = true
      }
    ): Promise<{ errno: number, msg: string }>
    $bsLink (uri: string): string
  }
}
