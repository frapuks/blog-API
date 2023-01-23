cd migration/
psql -U postgres -f init_db.sql
sqitch init oblog --engine pg --target db:pg:oblog
bash deploy/deploy.sh
bash verify/verify.sh
cd ..
node data/import_unique_req.js