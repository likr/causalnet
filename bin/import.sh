#!/bin/sh
rm -rf /var/lib/neo4j/data/databases/crest.db
neo4j-admin import --database crest.db --id-type string --nodes:Phenotype variables.csv --nodes:Text texts.csv --relationships:Correlation correlation.csv --relationships:Lasso lasso.csv --relationships:BaysianLasso baysian-lasso.csv --report-file /tmp/import.report
