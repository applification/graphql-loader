// Import GraphQL and destructure for easy access
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
 } from 'graphql'

// Import express server
import express from 'express'

// Import express-graphql an easy express integration of https://github.com/graphql/graphiql
import graphqlHTTP from 'express-graphql'

// Import loader (DataLoader
var Loader = require('./models/loader')

import film from './models/swapi/film'
import character from './models/swapi/character'
import species from './models/swapi/species'
import vehicle from './models/swapi/vehicle'
import starship from './models/swapi/starship'
import planet from './models/swapi/planet'

var RootQuery = function (loader) {
  return new GraphQLObjectType({
    name: 'Query',
    description: 'Realize Root Query',
    fields: () => ({
      film: {
        type: film,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.film.load(Number(id))
        //resolve: (...args) => console.log(args)
      },
      character: {
        type: character,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.character.load(Number(id))
      },
      vehicle: {
        type: vehicle,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.vehicle.load(Number(id))
      },
      starship: {
        type: starship,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.starship.load(Number(id))
      },
      species: {
        type: species,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.species.load(Number(id))
      },
      planet: {
        type: planet,
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve: (root, {id}) => loader.planet.load(Number(id))
      }
    })
  })
}


var Schema = function (loader) {
  return new GraphQLSchema({
    query: RootQuery(loader)
  })
}

var app = express()

app.use(function (req, res, next) {
  req.loader = Loader()
  next()
})

app.use('/graphql', graphqlHTTP(req => ({
  schema: Schema(req.loader),
  graphiql: true
})))

app.listen('3000')

var status = {
  Express: {
    "Online": true,
    "Port": 3000
  },
  "GraphiQL": {
    "url": "http://localhost:3000/graphql"
  }
}
console.dir(status, {depth: null, colors: true })
