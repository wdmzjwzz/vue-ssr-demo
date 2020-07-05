// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter'
import * as actions from './action'
Vue.use(Vuex)



const defaultState = {
    count: 0,
    topics: []
}
const isBrowser = typeof window !== "undefined"
const state = (isBrowser && window.__INITIAl_STATE__) || defaultState
const mutations = {
    INCREMENT: (state) => state.count++,
    DECREMENT: (state) => state.count--,
    TOPICS_LIST: (state, topics) => {
        state.topics = topics
    }
}
export function createStore() {
    return new Vuex.Store({
        state,
        actions,
        getters,
        mutations
    })
}