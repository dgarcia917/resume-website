# CI/CD pipeline validation...
import json
import logging
import os

import azure.functions as func
from azure.cosmos import CosmosClient

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="hello")
def hello(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({
            "message": "Hello from dg-resume-api",
            "status": "success"
        }),
        mimetype="application/json",
        status_code=200
    )


@app.route(route="counter")
def counter(req: func.HttpRequest) -> func.HttpResponse:

    try:
        client = CosmosClient.from_connection_string(
            os.environ["COSMOS_CONNECTION_STRING"]
        )

        database = client.get_database_client(
            os.environ["COSMOS_DATABASE"]
        )

        container = database.get_container_client(
            os.environ["COSMOS_CONTAINER"]
        )

        item = container.read_item(
            item="visitorCount",
            partition_key="visitorCount"
        )

        item["count"] += 1

        container.replace_item(
            item=item,
            body=item
        )

        return func.HttpResponse(
            json.dumps({
                "count": item["count"]
            }),
            mimetype="application/json",
            status_code=200
        )

    except Exception as ex:

        logging.exception("Counter function failed")

        return func.HttpResponse(
            json.dumps({
                "error": str(ex)
            }),
            mimetype="application/json",
            status_code=500
        )
