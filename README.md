## Getting Started with the project 

```
npm install
```

## Environment Configuration 

1. Create your own environment file (.env), we are using dotenv
2. Environment file configuration values can be found by reading config.js file

## Pending tasks (for now)
1. Setup husky and opinionated style coding
2. Unit testing


## Errors 1067
[SFO ANSWER TO FIX IT](https://stackoverflow.com/questions/36882149/error-1067-42000-invalid-default-value-for-created-at)

[GraphQL Input type Error](https://stackoverflow.com/questions/45806368/graphql-error-field-type-must-be-input-type-but-got?rq=1)


## Dummy Query 

This how you write Dummy Query to get data from GraphiQL 

```
{
  catWorksPersonal(userId: 1234) {
      id
      userDashboard {
    		id
      }
    }
}
```

Queries for Mutation