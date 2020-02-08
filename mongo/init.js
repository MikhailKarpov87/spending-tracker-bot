db = db.getSiblingDB('admin');

db.auth('root', 'rootpass');

db = db.getSiblingDB('financetracker');

db.createUser({
  user: 'financetracker',
  pwd: 'financetracker',
  roles: [{ role: 'readWrite', db: 'financetracker' }],
});
