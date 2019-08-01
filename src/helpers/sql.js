// This file is responsible for performing all sql related operations
const mysql = require('mysql');
const config = require('./../config')

const pool = mysql.createPool({
  host     : config.DB_HOST,
  user     : config.DB_USER,
  password : config.DB_PASSWORD,
  database : config.DB_DATABASE
});

// Checking if it was connected sucessfully or not on server startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  connection.release();
  return
});

// Create all the functions which are going to interact with sql here
const getEverythingFromTable =  (tableName) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
    if (error) return reject(error)
     const query = `SELECT * FROM ${tableName}`
      connection.query(query, (err, response) => {
      connection.destroy()
      if (err) return reject(err)
      return resolve(response)
      })
    })
  })
}


const getSelectedThingFromTable = (tableName, locationReference, locationReferenceValue) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error)
      const query = `SELECT * FROM ${tableName} WHERE ${locationReference} = ${locationReferenceValue}`
      connection.query(query, (err, response) => {
        connection.destroy()
        if (err) return reject(err)
        return resolve(response)
      })
    })
  })
}

//TODO: Create Multiple Reference function
// Later

// Inserting in SQL table
const insertIntheTable = (tableName, fields, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error)
      const query = `INSERT INTO ${tableName} ${fields} VALUES ${value}`
      connection.query(query, (err, response) => {
        connection.destroy()
        if (err) return reject(err)
        return resolve(response)
      })
    })
  })
}



// Delete SQL Queries 
const deleteSelectedFieldFromSql = (tableName, toDeleteColumn, toDeleteValue) => {
  return new Promise ((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error)
      const query = `DELETE FROM ${tableName} WHERE ${toDeleteColumn} = ${toDeleteValue}`
      connection.query(query, (err, response) => {
        connection.destroy()
        if (err) return reject(err)
        return resolve(response)
      })
    })
  })
}


// Update SQL Queries 
const updateFieldInTable = (tableName, conditionParameter, updatedCondition, locationReference, locationReferenceValue) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error)
      const query = `UPDATE ${tableName} SET ${conditionParameter} = ${updatedCondition} WHERE ${locationReference} = ${locationReferenceValue}`
      connection.query(query, (err, response) => {
        connection.destroy()
        if (err) return reject(err)
        return resolve(response)
      })
    })
  })
}


module.exports =  {
  getEverythingFromTable,
  getSelectedThingFromTable,
  updateFieldInTable,
  deleteSelectedFieldFromSql
}