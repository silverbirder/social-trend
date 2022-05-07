include .env

deploy:
	gcloud beta run deploy ${SERVICE_NAME} \
	--source . \
	--allow-unauthenticated  \
	--region ${REGION} \
	--service-account ${SERVICE_ACCOUNT}