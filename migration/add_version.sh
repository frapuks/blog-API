sqitch add 1.create_tables -n "création des tables"
sqitch add 2.add_domains -n "création des domaines SQL"
sqitch add 3.delete_constraint_on_delete_cascade -n "Suppression de la contrainte ON DELETE CASCADE sur la FK catégory_id"
sqitch add 4.add_constraint_unique -n "Ajout des contraintes UNIQUE"