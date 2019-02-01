# Makefile for DB schema

ROOT := .
include $(ROOT)/make-include.mk

createtableschema:
	$(PYTHON) Serverless101CreateTableSchema.py

clean:
	rm -f CreateTable*.py
	rm -f InvokeCreateTable.py
