import Vue from 'vue'
import Vuex from 'vuex'
import organisations from "@/store/modulse/organisations";
import events from "@/store/modulse/events";
import users from "@/store/modulse/users";
import categories from "@/store/modulse/categories";
import eventsTypes from "@/store/modulse/eventsTypes";
import inventory from "@/store/modulse/inventory";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        organisations,
        events,
        users,
        categories,
        eventsTypes,
        inventory
    }
})