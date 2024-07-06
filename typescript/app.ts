import { Buildings } from './data'

// define a type
type BuildingEntity = {
    "id": string,
    "name": string,
    "location": string,
    "numberOfFloors": number,
    "occupancyStatus": boolean,
    "price": number
}

type FilterItem = {
    name: string
    value: any
    type: 'string' | 'number'
    operator: 'ge' | 'le'
}



type Response<T> = {
    payload: T | null,
    status: number
}

let Data = Buildings

// class BuildingApp
class BuildingApp {
    // getAll
    getAll(filters: FilterItem[]): BuildingEntity[] {
        let result = Data
        const exactMatchPredicate = (fieldName: string, fieldValue: string) => (building: BuildingEntity) => {
            return building[fieldName] === fieldValue
        }
        const numberPredicate = (fieldName: string, fieldValue: string, operator: 'ge' | 'le'
        ) => (building: BuildingEntity) => {
            if (operator === 'ge')
                return building[fieldName] >= fieldValue
            if (operator === 'le')
                return building[fieldName] <= fieldValue
            throw new Error(`Unsupported operator "${operator}"`)
        }

        for (let { name, value, type, operator } of filters) {
            let customPredicate
            if (type === 'string')
                customPredicate = exactMatchPredicate(name, value)
            else if (type === 'number')
                customPredicate = numberPredicate(name, value, operator)
            else throw new Error(`Unsupported type "${type}"`)

            result = result.filter(customPredicate)
        }
        return result
    }
    // get
    get(id: string): BuildingEntity | null {
        const maybeBuilding = Data.find(building => building.id === id)
        return maybeBuilding
    }
    // create
    create(building: BuildingEntity): void {
        // TODO: validate
        Data.push(building)
    }
    // partiallyUpdate

    // remove
    remove(id: string): void {
        Data = Data.filter(building => building.id !== id)
    }
}

const app = new BuildingApp()
const filters: FilterItem[] = [
    { name: 'name', value: 'Office building', type: 'string', operator: undefined },
    { name: 'numberOfFloors', value: 50, type: 'number', operator: 'ge' },
]
console.log(app.getAll(filters))