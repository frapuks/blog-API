mkdir logs
touch .env
echo "PORT=3111" >> .env
echo "PGHOST=localhost" >> .env
echo "PGUSER=admin_oblog" >> .env
echo "PGPASSWORD=oblog" >> .env
echo "PGDATABASE=oblog" >> .env
echo "PGPORT=5432" >> .env
npm i
npm run initDb
npm run start