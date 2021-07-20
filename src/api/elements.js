import { HTTP } from './common'


let defaultRequests = function (url) {
    return {
        async post(config) {
            return HTTP.post(`${url}`, config).then(response => {
                console.log(response)
                return response.data
            })
        },
        async get(element) {
            return HTTP.get(`${url}${element.id}/`)
        },
        async patch(element) {
            console.log(element)
            return HTTP.patch(`${url}${element.id}/`, element).then(response => {
                console.log(response)
                return response.data
            })
        },
        async delete(id) {
            HTTP.delete(`${url}${id}/`)
            return id
        },
        async list() {
            return HTTP.get(`${url}`).then(response => {
                return response.data
            })
        }

    }
}

export const Organizations = defaultRequests(`/organizations/`)
export const Users = defaultRequests(`/users/`)
export const Events = defaultRequests(`/events/`)
export const Categories = defaultRequests(`/categories/`)
export const EventTypes = defaultRequests(`/event-types/`)
export const Inventory = defaultRequests(`/inventory/`)


