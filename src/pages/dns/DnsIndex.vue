<script setup lang="ts">
import { ref } from 'vue'
import { navigateToUrl } from 'single-spa'
import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'

const store = useStore()
const tc = i18n.global.tc
// const route = useRoute()

const activeTab = ref(store.items.currentPath[1]) // keep selection when reloading

</script>

<template>
  <div class="PersonalIndex">
    <q-scroll-area style="height: calc(100vh - 60px);" >
      <div class="column">

        <div class="col-auto">
          <div class="row justify-center">

            <div class="content-fixed-width">

              <div class="row justify-between q-pt-lg q-pb-sm">

                <div class="col-auto row items-end text-h6 q-px-none">
                  DNS态势
                </div>

              </div>

              <div class="row">
                <div class="col">
                  <q-tabs
                    v-model="activeTab"
                    indicator-color="primary"
                    active-color="primary"
                    align="left"
                    inline-label
                  >
                    <q-tab
                      no-caps
                      class="q-px-none q-py-md q-mr-md text-bold"
                      name="list"
                      icon="computer"
                      :label="tc('实时数据')"
                      :ripple="false"
                      @click="activeTab = 'list'; navigateToUrl('/my/trend/dns/list')"
                    />
                    <q-tab
                      no-caps
                      class="q-px-none q-py-md q-mr-md text-bold"
                      name="history"
                      icon="computer"
                      :label="tc('历史趋势')"
                      :ripple="false"
                      @click="activeTab = 'history'; navigateToUrl('/my/trend/dns/history')"
                    />
                    <q-tab
                      no-caps
                      class="q-px-none q-py-md q-mr-md text-bold"
                      name="area"
                      icon="computer"
                      :label="tc('用户区域')"
                      :ripple="false"
                      @click="activeTab = 'area'; navigateToUrl('/my/trend/dns/area')"
                    />
                  </q-tabs>
                </div>
              </div>
            </div>
          </div>
        </div>

        <q-separator/>

        <div class="col-auto q-pt-xl">
          <div class="row justify-center">
            <router-view class="content-fixed-width"/>
          </div>
        </div>

      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped>
.DnsIndex {
}
</style>
