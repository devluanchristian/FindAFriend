export class PetDoesNotExist extends Error {
  constructor() {
    super('Pet does not exist')
  }
}
