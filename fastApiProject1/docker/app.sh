#!/bin/bash

alembic upgrade head

gunicorn main:app --workers 1c --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000