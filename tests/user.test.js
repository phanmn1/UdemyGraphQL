import { getFirstName, isValidPassword } from '../src/utils/user'
test('should return first name when given full name', () => {
    const firstName = getFirstName('Andrew Mead')
    expect(firstName).toBe('Andrew')
})

test('should return first name when given first name', () => {
    const firstName = getFirstName('Jenn')
    expect(firstName).toBe('Jenn')
})

test('should reject password shorter than 8 characters', () => {
    const isValid = isValidPassword('abc123')
    expect(isValid).toBe(false)
})

test('should reject password that contains word password', () => {
    const isValid = isValidPassword('password')
    expect(isValid).toBe(false)
})

test('should correcty validate a password', () => {
    const isValid = isValidPassword('393;aldkf034')
    expect(isValid).toBe(true)
})