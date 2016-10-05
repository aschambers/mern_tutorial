#!/usr/bin/mongo

var db = new Mongo().getDB("bugsdb");

db.bugs.remove({});

db.bugs.insert([
  {priority: 1, status: "Open", owner: "Alex", decs: "App crashes when opening"},
  {priority: 2, status: "New", owner: "Brian", decs: "Pages have a weird border"},
  {priority: 3, status: "New", owner: "Ryan", decs: "Can't login to my e-mail"}
]);