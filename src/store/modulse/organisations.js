import {
    Organizations,
} from '@/api/elements'
import {
    ADD_ORGANIZATION,
    SET_ORGANIZATIONS,
    REMOVE_ORGANIZATION,
    PATCH_ORGANIZATION,
    PUT_ORGANIZATION
} from '../mutation-types'
import {applyPatch, createPatch} from 'rfc6902'



// Геттеры
export default {
    state: {
        organizations: [],
    },
    getters: {
        allOrganizations(state) {
            return state.organizations
        }
    },
// Мутации
    mutations: {
        [ADD_ORGANIZATION](state, organization) {
            state.organizations = [organization, ...state.organizations]
        },
        [REMOVE_ORGANIZATION](state, {id}) {
            state.organizations = state.organizations.filter(organizations => {
                return organizations.id !== id
            })
        },
        [PUT_ORGANIZATION](state, organization) {
            state.organizations.filter(t => {return t.id === organization.id})[0] = organization
        },
        [PATCH_ORGANIZATION](state, organization) {
            let patchedOrganization = state.organizations.filter(t => {return t.id === organization.id})[0]
            let patch = createPatch(patchedOrganization, organization)
            let updatePatch = []
            for (let row of patch){
                if (row.op !== 'remove '){
                    updatePatch.push(row)
                }
            }
            applyPatch(patchedOrganization,updatePatch)
        },
        [SET_ORGANIZATIONS](state, {organizations}) {
            state.organizations = organizations
        },
    },
// Действия
    actions: {
        async createOrganization({commit}, organizationData) {
            await Organizations.post(organizationData).then(organization => {
                commit(ADD_ORGANIZATION, organization).catch((error) => {
                    console.log(error)
                })
            })
        },
        async deleteOrganization({commit}, organizationData) {
            await Organizations.delete(organizationData).then(organization => {
                commit(REMOVE_ORGANIZATION, organization).catch((error) => {
                    console.log(error)
                })
            })
        },
        async getOrganizations({commit}) {
            await Organizations.list().then(organizations => {
                commit(SET_ORGANIZATIONS, {organizations}).catch((error) => {
                    console.log(error)
                })

            })
        },
        async putOrganization({commit}, organizationData) {
            await Organizations.put(organizationData).then(organization => {
                commit(PUT_ORGANIZATION, organization).catch((error) => {
                    console.log(error)
                })

            })
        },
        async patchOrganization({commit}, organizationData) {
            await Organizations.patch(organizationData).then(organization => {
                commit(PATCH_ORGANIZATION, organization).catch((error) => {
                    console.log(error)
                })

            })
        },

    },
}
