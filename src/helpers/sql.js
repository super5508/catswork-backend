// This file is responsible for performing all sql related operations
const mysql = require('mysql');
const config = require('./../config');

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

// Checking if it was connected sucessfully or not on server startup
pool.getConnection((err, connection) => {
  if (err) {
    console.log(config.DB_PASSWORD);
    console.error('error connecting: ' + err);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  connection.release();
  return;
});

// Create all the functions which are going to interact with sql here
const getEverythingFromTable = tableName => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error);
      const query = `SELECT * FROM ${tableName}`;
      connection.query(query, (err, response) => {
        connection.destroy();
        if (err) return reject(err);
        return resolve(response);
      });
    });
  });
};

const getSelectedThingFromTable = (tableName, condition) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error);
      const query = `SELECT * FROM ${tableName} WHERE ${condition}`;
      connection.query(query, (err, response) => {
        connection.destroy();
        if (err) return reject(err);
        return resolve(response);
      });
    });
  });
};

// Inserting new records in SQL table
const insertIntheTable = (tableName, insertionValues) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error);
      if (insertionValues) insertionValues = setValuesForInsertion(insertionValues);
      const query = `INSERT INTO ${tableName} ${insertionValues}`;
      connection.query(query, (err, response) => {
        connection.destroy();
        if (err) return reject(err);
        return resolve(response);
      });
    });
  });
};

// Delete SQL Queries
const deleteSelectedRow = (tableName, toDeleteCondition, toDeleteValue) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error);
      const query = `DELETE FROM ${tableName} WHERE ${toDeleteCondition} = ${toDeleteValue}`;
      connection.query(query, (err, response) => {
        connection.destroy();
        if (err) return reject(err);
        return resolve(response);
      });
    });
  });
};

// Update SQL Queries
const updateFieldInTable = (tableName, updatedQuery, condition) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) return reject(error);
      if (updatedQuery) updatedQuery = setValuesForMutation(updatedQuery);
      const query = `UPDATE ${tableName} SET ${updatedQuery} WHERE ${condition}`;
      console.log(query);
      connection.query(query, (err, response) => {
        connection.destroy();
        if (err) return reject(err);
        return resolve(response);
      });
    });
  });
};

//TODO: Create Multiple Reference function or adding multiple values at once
const readOnlyValues = {
  createdAt: true,
  updatedAt: true,
  userId: true,
  personId: true,
};
// clean object for insertion
const setValuesForInsertion = valuePassed => {
  let keys = '';
  let values = '';
  valuePassed.createdAt = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  valuePassed.updatedAt = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  for (x in valuePassed) {
    const key = x.trim();
    if (typeof valuePassed[x] === 'string') {
      values = values + `"${valuePassed[x]}"` + ',';
    } else {
      values = values + valuePassed[x] + ',';
    }
    keys = keys + key + ',';
  }
  const updatedAt = Date.now();
  return `(` + keys.slice(0, -1) + ')' + 'VALUES' + '(' + values.slice(0, -1) + ')';
};

// Clenaing object for update
const setValuesForMutation = valuePassed => {
  let newQuery = '';
  if (typeof valuePassed === 'object') {
    for (x in valuePassed) {
      if (valuePassed[x]) {
        const key = x.trim();
        if (!readOnlyValues[key]) {
          let value = valuePassed[x];
          if (typeof value === 'string') value = `"${value}"`;
          newQuery = newQuery + x + '=' + value + ',';
        }
      }
    }
    newQuery = newQuery.slice(0, -1);
  }
  if (typeof valuePassed === 'string') newQuery = valuePassed.trim();
  return newQuery;
};

const cleanValues = valuePassed => {
  //TODO: For object as well
  if (typeof valuePassed === 'string') newQuery = valuePassed.trim();
  return valuePassed;
};

module.exports = {
  getEverythingFromTable,
  getSelectedThingFromTable,
  updateFieldInTable,
  deleteSelectedRow,
  insertIntheTable,
};
