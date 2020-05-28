const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create } } = require('../data')
const { UnexistenceError, CredentialsError } = require('../errors')

describe('logic - authenticate user', () => {
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteMany(error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const user = { name, surname, email, password }

            create(user, (error, id) => {
                if (error) return done(error)

                userId = id

                done()
            })
        })

        it('should succeed on correct credentials', () => 
            authenticateUser(email, password)
                .then(_userId=>expect(_userId).to.equal(userId)) 
        )

        it('should fail on wrong password', () => 
            authenticateUser(email, "123")
                .then(()=>{throw new Error("Should not be here")})
                .catch(error=> { 
                    expect(error).to.be.an.instanceOf(CredentialsError)
                    
                    expect(error.message).to.equal(`wrong password`)
                })
        )
    })
    
    describe('when user does not exist', ()=>{
        it('should fail when user does not exist', () => 
            authenticateUser(email, password)
                .then(()=>{throw new Error("Should throw error")})
                .catch(error=>{
                    expect(error).to.be.an.instanceof(UnexistenceError)
                    expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
                })
        )
    })
        
    afterEach(done => {
        deleteMany(error => {
            if (error) return done(error)
            
            done()
        })
    })
})